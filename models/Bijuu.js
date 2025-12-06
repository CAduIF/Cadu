import conexao from "../config/conexao.js";

const BijuuSchema = conexao.Schema({
    nome:{type:String, required:true},
    hospedeiro:{type:String},
    ndecaudas:{type:String}
})
const Bijuu = conexao.model("Bijuu", BijuuSchema);
export default Bijuu