import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Token from cookies:", token);

    // 1️⃣ Check if token exists
    if (!token) {
      return res.status(401).json({ message: "User doesn't have a token" });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verify error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 3️⃣ Attach userId to request
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.userId;
    next();

  } catch (error) {
    console.error("isAuth middleware error:", error.message);
    res.status(500).json({ message: "Internal server error in auth" });
  }
};

export default isAuth;
