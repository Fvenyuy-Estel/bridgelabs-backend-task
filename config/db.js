const mongoose = require('mongoose')
const express = require("express");
const multer  = require('multer')
const app = express()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Fvenyuy:fonchu@cluster0.4mztmcd.mongodb.net/test')

    console.log(`MongoDB Connected: ${conn.connection.host}`.underline)
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

module.exports = connectDB