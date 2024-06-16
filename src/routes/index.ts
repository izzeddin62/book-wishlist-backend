import { Router } from "express";
import authRoutes from "./auth";
import bookRoutes from "./book";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/books", bookRoutes);

export default routes;
