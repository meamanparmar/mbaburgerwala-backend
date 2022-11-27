import express from "express";
import {  getAdminStats, getAdminUsers, logout, myProfile } from "../controllers/user.js";
import passport from "passport";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();


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