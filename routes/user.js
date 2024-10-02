import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../controllers/user.js";


// create router
const userRouter = Router();

// define routes
userRouter.post("/users/register", registerUser)

userRouter.post("/users/login", userLogin)

userRouter.post("/users/logout", userLogout)

// export router
export default userRouter;