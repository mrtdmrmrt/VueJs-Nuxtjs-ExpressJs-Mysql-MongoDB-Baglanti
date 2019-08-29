const express = require("express")
const mysql = require("mysql")
const mongoose = require("mongoose")

//sinif database e denk geliyor
//Database
//mongoose.connect("mongodb://localhost/sinif")
mongoose.connect("mongodb+srv://nuxt-user:nuxt123!@cluster0-jzamu.mongodb.net/sinif?retryWrites=true&w=majority")


//Colelction
const Course =mongoose.model('courses',{
    title : String,
    couponCode :String
})


const app = express()

//mysql'e bağlantı için gerekli biligler

let connection = mysql.createConnection({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "password",
    database :"Developer"
});


connection.connect(function(error){
    if(!error){
        console.log("Connected")
    }
    else{
        console.log("Error \n"+ JSON.stringify(error,undefined,2))
    }
});//mysql'e bağlantı sağlandı

app.get("/",(req,res)=>{
    
    console.log("GET isteği geldi...")
    
    //results tam cevabı verir
    connection.query("SELECT * FROM courses",(err,results,fields)=>{
        //console.log(results)
        res.status(200).json({
            courses : results
        })
    })    
})




app.get("/mongodb",(req,res)=>{
    console.log("MongoDB için GET isteği geldi..")
    
    //BSON
    //document
    let courseItem = new Course({
        title: "NuxtJs",
        couponCode : "TYUL"
    })
    courseItem.save()
    .then(()=>{
        console.log("KURS EKLENDİ..")
    }
    )

    res.status(200).json()
})



app.get("/mongodb-get-data",(req,res)=>{
    console.log("MongoDB  Data için GET isteği geldi..")
  //Arama işlemi
    //Course.find({},(error,docs)=>{
    Course.find({},(error,docs)=>{
        res.status(200).json({
            courses : docs
        })
    })

    
})

module.exports={
    path : "/api",
    handler : app
}