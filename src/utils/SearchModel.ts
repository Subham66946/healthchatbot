import mongoose from "mongoose";

const SearchSchema=new mongoose.Schema({
    query:
    {
       type:String,
       required:true
    },
    response:{
        type:String,
        required:true
    }
})


const Client=mongoose.models.searchs||mongoose.model("searchs",SearchSchema);

export default Client;