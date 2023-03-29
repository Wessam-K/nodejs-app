import express from "express"
import os from "os"

const app = express()
const PORT = 3000 

app.get("/",(req,res)=>{
    const message =`Hello Word i Am Pod ${os.hostname()}: Version 1.3.0 ` 
    res.send(message)
})

app.listen (PORT,()=>{
    console.log(`Web Serve is lisen @ port ${PORT}`)
    console.log(os.hostname())
})