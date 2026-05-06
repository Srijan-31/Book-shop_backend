const {initializeDatabase}=require("./db/db.connect")
const express=require("express")
const app=express()
const Book=require("./books.models")
const Category=require("./category.models")

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

async function readBooksById(bookId){
    try{
        const book=await Book.findById(bookId)
        return book
    }catch(error){
        console.log(error)
    }
}

app.get("/books/:bookId", async (req,res)=>{
    try{
        const book=await readBooksById(req.params.bookId)
        if(book){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch book data."})
    }
})

async function readAllCategory(){
    try{
        const categories=await Category.find()
        return categories
    }catch(error){
        console.log(error)
    }
}

app.get("/categories", async (req,res)=>{
    try{
        const category=await readAllCategory()
        if(category.length!==0){
            res.json(category)
        }else{
            res.status(404).json({error: "Category not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the data"})
    }
})

async function readCategoryById(categoryId){
    try{
        const category=await Category.findById(categoryId)
        return category
    }catch(error){
        console.log(error)
    }
}

app.get("/categories/:categoryId", async (req,res)=>{
    try{
        const categoryById=await readCategoryById(req.params.categoryId)
        if(categoryById){
            res.json(categoryById)
        }else{
            res.status(404).json({error:"Cagtegory not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch category."})
    }
})

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})