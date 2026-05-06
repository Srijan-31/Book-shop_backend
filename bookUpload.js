const {initializeDatabase}=require("./db/db.connect")
const fs=require("fs")
const Book=require("./books.models")
initializeDatabase()

const jsonData=fs.readFileSync("Books.json","utf-8")
const bookData=JSON.parse(jsonData)

async function insertBookData(){
    try{
        await Book.deleteMany({})
        await Book.insertMany(bookData)
        console.log("All books inserted.")
    }catch(error){
        console.log("Error in uploading data",error)
    }
}

insertBookData()
