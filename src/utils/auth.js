import jwt from "jsonwebtoken";
import { User } from "../components/user/user.model";

const SECRET = process.env.JWT_SECRET;

export const generateToken = (userId) => {
  const thirtyMinInMs = String(1000 * 60 * 30);
  const noExpInDevEnv =
    process.env.NODE_ENV === "development"
      ? null
      : { expiresIn: thirtyMinInMs };

  return jwt.sign({ id: userId }, SECRET, noExpInDevEnv);
};

export const authenticateToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const protectRoute = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  let payload;
  try {
    payload = await authenticateToken(token);
  } catch (err) {
    return next(err);
  }

  const returnFields = ["_id", "email", "username"]; // ! ensure password is excluded
  const user = await User.findById(payload.id, returnFields).lean();

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};
