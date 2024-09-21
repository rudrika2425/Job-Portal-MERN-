import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer"; // Use the multer npm package directly if needed
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

// Configure multer if you use it for file uploads
const upload = multer({ dest: 'uploads/' }); // Adjust configuration as needed

const router = express.Router();

// Define routes
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, upload.single('file'), updateCompany); // Use multer for file uploads

export default router;
