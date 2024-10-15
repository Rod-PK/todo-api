import { Router } from "express";
import { registerUser, userLogin, userLogout, updateProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";


// create router
const userRouter = Router();

// define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", userLogin);

userRouter.post("/users/logout", userLogout);

userRouter.post("/users/me", userAvatarUpload.single("avatar"), updateProfile);

// export router
export default userRouter;