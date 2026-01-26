import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        provider: "google",
        oauthId: sub,
        isVerified: true,
        // profileImage: { url: picture },
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked" });
    }

    generateToken(user._id, res);
    const { password: userPassword, ...userData } = user._doc;
    userData.password = undefined;
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res) => {
  try {
    const { email, name, password } = req?.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6 || password.length > 10) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 10 characters" });
    }

    const dup = await User.findOne({ email }).exec();
    if (dup) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashPwd,
    });

    if (user) {
      generateToken(user._id, res);
      const { password, ...userData } = user._doc;
      userData.password = undefined;
      res.status(201).json(userData);
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    const { password: userPassword, ...userData } = user._doc;
    userData.password = undefined;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
};
