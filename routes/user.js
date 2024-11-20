import { Router } from "express";
import { registerUser, userLogin, userLogout, updateProfile, getProfile,  } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


// create router
const userRouter = Router();

// define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", userLogin);

userRouter.get("/users/me", isAuthenticated, hasPermission("get_profile"), getProfile);

userRouter.post("/users/logout", isAuthenticated, userLogout);

userRouter.post("/users/me", isAuthenticated, hasPermission ("update_profile"), userAvatarUpload.single("avatar"), updateProfile);

// export router
export default userRouter;