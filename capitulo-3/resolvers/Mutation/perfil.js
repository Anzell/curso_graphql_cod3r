const {perfis,proximoIdPerfil} = require("../../data/db")
const {indicePerfil} = require("../../functions/indices")


module.exports={
    novoPerfil(_,{dados}){
        const novo ={
            id: proximoIdPerfil(),
            ...dados
        }
        perfis.push(novo);
        return novo;
    },

    excluirPerfil(_,{filtro}){
        const i = indicePerfil(filtro,perfis)
        if(i<0){
            return null
        }
        const perfilExcluido = perfis.splice(i,1);
        return perfilExcluido ? perfilExcluido[0] : null
    },

    alterarPerfil(_,{filtro,novosDados}){
        const i= indicePerfil(filtro,perfis)
        const obj = {
            ...perfis[i],
            ...novosDados
        }
        const perfilAtualizado = perfis.splice(i,1,obj);
        return obj
    }
    
}