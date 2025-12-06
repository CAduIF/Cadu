import conexao from "../config/conexao.js";

const VilaSchema = conexao.Schema({
    nome:{type:String},
    pais:{type:String},
    kage:{type:String},
    fundador:{type:String}

})
const Vila = conexao.model("Vila", VilaSchema);
export default Vila