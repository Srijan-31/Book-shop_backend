const {initializeDatabase}=require("./db/db.connect")
const fs=require("fs")
const Book=require("./books.models")
initializeDatabase()

const jsonData=fs.readFileSync("Books.json","utf-8")
const itemData=JSON.parse(jsonData)

async function seeData(){
    try{
        for(const bookData of itemData){
            const newBook=new Book({
                title: bookData.title,
                author: bookData.author,
                category: bookData.category,
                oldPrice: bookData.oldPrice,
                discount: bookData.discount,
                price: bookData.price,
                rating: bookData.rating,
                stock: bookData.stock,
                image: bookData.image,
                description: bookData.description
            })
            await newBook.save()
        }
        console.log("All data uploaded successfully.")
    }catch(error){
        console.log("Error in uploading data",error)
    }
}

seeData()