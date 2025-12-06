import mongoose from "mongoose";
const url = 
"mongodb+srv://cadu:1234@cadu.2xymwut.mongodb.net/?appName=cadu";
const conexao = await mongoose.connect(url)
export default conexao
