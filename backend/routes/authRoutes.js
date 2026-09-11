import express from "express";
import { getCity, getState, attendance } from "../Controllers/Master/CityMasterControllers.js";
import {users} from "../Controllers/TreeView/usersController.js"
const router = express.Router();

  router.get("/", getCity);
router.get("/getState",getState);
 router.get("/attendance",attendance);
 router.get("/users",users);
export default router;

