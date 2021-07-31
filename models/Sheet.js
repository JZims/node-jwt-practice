import mongoose from "mongoose";


export const SheetSchema = mongoose.Schema(
{
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
        required: true
    },  
    date: {
        type: Date,
        default: Date.now
    }
});

const Sheet = mongoose.model('Sheets', SheetSchema)

export default Sheet