import mongoose from "mongoose"
import Sheet from "../models/Sheet.js"


//Routes for all CRUD actions in Sheets

export const createASheet =  async (req, res) => {
    const sheet = new Sheet({
        title: req.body.title, 
        description: req.body.description
    })
 
    try {
   const savedSheet =  await sheet.save()
    res.json(savedSheet)
    } catch(err) {
        res.json({ message: err })
    }

}

//Needs to specify for a logged in user 
export const getAllSheets = async (req, res) => {
    try {
       const sheets = await Sheet.find() 
       res.json(sheets)
    } catch (err) {
        res.json({ message: err })
    } 
    
}
 
//Needs to specify for a logged in user
export const getASheet = async (req, res) => {
    try {
    const sheet = await Sheet.findById(req.params.sheetId)
    res.json(sheet)
    } catch (err) {
        res.json({ message: err })
    }
} 

export const updateASheet = async (req, res) => {
    try { 
        const updatedSheet = await Sheet.updateOne(
            { _id: req.params.sheetId }, 
            { $set: { title: req.body.title } }
        );
        res.json(updatedSheet) 
    } catch(err) {
        res.json({ message: err });
    }
}

export const deleteASheet = async (req, res) => {
    try { 
        const removedSheet = await Sheet.deleteOne({ _id: req.params.sheetId })
        res.json(removedSheet)
    } catch(err) {
        res.json({ message: err });
    }
}