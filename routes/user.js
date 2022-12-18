import express from "express";
import {  getAdminStats, getAdminUsers, logout, myProfile } from "../controllers/user.js";
import passport from "passport";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});
router.get(
    "/googlelogin",
    passport.authenticate("google",{
        scope:["profile"],
})
)


// router.get(
//     "/login",
//     passport.authenticate("google"),{
//         // successRedirect:prcess.env.FRONTEND_URL
//         successRedirect:process.env.FRONTEND_URL
//     }
    
// )
router.get(
    "/login",
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL,
    })
  );

router.get("/me", isAuthenticated ,myProfile)
router.get("/logout",logout)

//admin route

router.get("/admin/users", isAuthenticated , authorizedAdmin , getAdminUsers)

router.get("/admin/stats" , isAuthenticated ,authorizedAdmin , getAdminStats)
export default router;