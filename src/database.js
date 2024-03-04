
const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://coderhouse50045:Coder1@cluster0.fpmis3v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa"))
    .catch(() => console.log("Error en la conexion"))

