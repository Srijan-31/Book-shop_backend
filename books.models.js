const mongoose=require("mongoose")

const booksSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
    },
    oldPrice:{
        type:Number,
    },
    discount:{
        type:Number,
    },
    price:{
        type:Number
    },
    rating:{
        type:Number
    },
    stock:{
        type:Number
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const Book=mongoose.model("Book",booksSchema,"Books")
module.exports=Book