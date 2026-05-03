const {initializeDatabase}=require("./db/db.connect")
const express=require("express")
const app=express()
const Book=require("./books.models")

app.use(express.json())

initializeDatabase()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("Api working.")
})

async function readAllData(){
    try{
        const allData=await Book.find()
        return allData
    }catch(error){
        console.log(error)
    }
}

app.get("/books",async (req,res)=>{
    try{
        const data=await readAllData()
        if(data.length!==0){
            res.json(data)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Failed to get data."})
    }
})

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})