const db = require('../../config/db')
const bcrypt  = require("bcrypt-nodejs")
const {getUsuarioLogado}=require("../comum/usuario")

module.exports = {
    async login(_,{dados}){
        const usuario = await db("usuarios").where({email:dados.email}).first();

        if(!usuario){
            return new Error("Usuario/Senha invalido")
        }
        const saoIguais = bcrypt.compareSync(dados.senha,usuario.senha)
        if(!saoIguais){
            return new Error("usuario/senha invalido")
        }
        return getUsuarioLogado(usuario);
    },
    usuarios() {
        return db('usuarios')
    },
    usuario(_, { filtro }) {
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('usuarios')
                .where({ id })
                .first()
        } else if(email) {
            return db('usuarios')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}