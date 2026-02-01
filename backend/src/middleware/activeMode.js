export const requireCareseeker = (req, res, next) => {
  if (req.user.activeMode !== "careSeeker") {
    return res.status(403).json({ message: "Switch to CARESEEKER mode" });
  }
  next();
};

export const requireCarer = (req, res, next) => {
  if (req.user.activeMode !== "carer") {
    return res.status(403).json({ message: "Switch to CARER mode" });
  }
  next();
};
