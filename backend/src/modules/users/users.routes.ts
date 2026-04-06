import { Router } from "express";
import { usersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorizeRole } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";

export const usersRouter = Router();
usersRouter.use(authMiddleware, authorizeRole([Role.ADMIN]));

usersRouter.post("/", usersController.createUser);
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.patch("/:id", usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);
