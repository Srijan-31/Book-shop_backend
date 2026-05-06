const {initializeDatabase}=require("./db/db.connect")
const fs=require("fs")
const Category=require("./category.models")

initializeDatabase()

const jsonData=fs.readFileSync("category.json","utf-8")
const categories=JSON.parse(jsonData)

async function insertCategories(){
    try{
        await Category.deleteMany({})
        await Category.insertMany(categories)
    console.log("All categories inserted.")
    }catch(error){
        console.log(error)
    }
}

insertCategories()