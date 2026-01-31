import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res, next) => {
  try {
    const { idToken, location } = req.body;

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
      const userData = {
        name,
        email,
        provider: "google",
        oauthId: sub,
        isVerified: true,
        profilePicture: picture,
      };

      if (
        location &&
        typeof location.lat === "number" &&
        typeof location.lng === "number"
      ) {
        userData.location = {
          city: location.city || "",
          country: location.country || "",
          geo: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
        };

        userData.hasLocation = true;
      }

      user = await User.create(userData);
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked" });
    }

    generateToken(user._id, res);

    const { password, ...userDataToSend } = user._doc;
    res.status(200).json(userDataToSend);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res) => {
  try {
    const { email, name, password, location } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6 || password.length > 10) {
      return res.status(400).json({
        message: "Password must be between 6 and 10 characters",
      });
    }

    const dup = await User.findOne({ email }).exec();
    if (dup) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const userData = {
      email,
      name,
      password: hashPwd,
    };

    if (
      location &&
      typeof location.lat === "number" &&
      typeof location.lng === "number"
    ) {
      userData.location = {
        city: location.city || "",
        country: location.country || "",
        geo: {
          type: "Point",
          coordinates: [location.lng, location.lat], // lng, lat
        },
      };

      userData.hasLocation = true;
    }

    const user = await User.create(userData);

    generateToken(user._id, res);

    const { password: pwd, ...userDataToSend } = user._doc;

    res.status(201).json(userDataToSend);
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

export const refreshToken = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error during check auth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req?.body;
    const userId = req?.user?.id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const upload = await cloudinary.uploader.upload(profilePicture, {
      upload_preset: "B4t",
      folder: "B4t",
    });
    if (!upload) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: upload.secure_url },
      { new: true },
    );

    if (updatedUser) {
      res.status(200).json({ profilePicture: updatedUser?.profilePicture });
    } else {
      return res.status(500).json({ message: "Error updating user" });
    }
  } catch (error) {
    console.error("Error during update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserLocation = async (req, res) => {
  try {
    const { location } = req?.body;
    const userId = req?.user?.id;

    if (!location) {
      return res.status(400).json({ message: "location is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true },
    );

    if (user) {
      res.status(200).json({ location: user?.location });
    } else {
      return res.status(500).json({ message: "Error updating user" });
    }
  } catch (error) {
    console.error("Error during update user location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
