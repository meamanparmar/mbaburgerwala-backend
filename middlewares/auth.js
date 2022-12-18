import ErrorHandler from "../utils/ErrorHandler.js";
import cors from "cors"
import app from "../app.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  if (!token) {
    return next(new ErrorHandler("Not Logged In", 405));
  }
  next();
};
export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next();
};
