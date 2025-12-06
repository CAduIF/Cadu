import conexao from "../config/conexao.js";

const ClaSchema = conexao.Schema({
    nome:{type:String, required:true},
    fundador:{type:String},
    localidade:{type:String},
    kekkeigenkai:{type:String}

})
const Cla = conexao.model("Clã", ClaSchema);
export default Cla