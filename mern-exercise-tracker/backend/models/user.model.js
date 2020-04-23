// import { Schema, Mongoose } from "mongoose";

// Require mongoose
const mongoose = require('mongoose');

// new mongoose.Schema
const Schema = mongoose.Schema;

// The userSchema
const userSchema = new Schema({
    // Only has a single field
    username:{
        // validations for the username
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true, // When it is created and whenever it is modified
});

const User = mongoose.model('User', userSchema);

// Exporting to database
module.exports = User;