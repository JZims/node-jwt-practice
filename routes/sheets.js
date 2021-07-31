import express from "express"
import authenticateToken from "../middlewares/auth.js"
import { createASheet, getAllSheets, getASheet, updateASheet, deleteASheet } from "../controllers/sheet_controller.js";
const router = express.Router();

const Sheet = require('../models/Sheet');

//Submits a sheet
router.post('/', authenticateToken, createASheet)

//Retrieves all sheets
router.get('/', authenticateToken, getAllSheets);

//Get a specific sheet
router.get('/:sheetId', authenticateToken, getASheet);

//Update a Sheet
router.patch('/:sheetId', authenticateToken, updateASheet);

//Delete a Sheet
router.delete('/:sheetId', authenticateToken, deleteASheet);



export default router