const mongoose = require('mongoose')
const express = require("express");
const multer  = require('multer')
const app = express()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost/bridgelabsFrontend2')

    console.log(`MongoDB Connected: ${conn.connection.host}`.underline)
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

module.exports = connectDB