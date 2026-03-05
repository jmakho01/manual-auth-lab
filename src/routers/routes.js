import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

//requires a logged in user
router.get("/dashboard", authCtl.isLoggedIn, pageCtl.dashboardPage);

//requires an admin logged in
router.get("/admin", authCtl.isLoggedIn, authCtl.hasRole("admin"), pageCtl.adminPage);

router.get("/logout", authCtl.logout)

export default router;