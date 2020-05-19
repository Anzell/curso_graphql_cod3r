const db = require('../../config/db')

module.exports = {
    async novoUsuario(_, { dados }) {
        const id = await db("usuarios").insert({ ...dados })
        return await db("usuarios").where({ id }).first();
    },
    async excluirUsuario(_, { filtro }) {
        const id = await db("usuarios").update({ ativo: 0 }).where({ id: filtro.id })
        return await db("usuarios").where({ id }).first()
    },
    async alterarUsuario(_, { filtro, dados }) {
        const id = await db("usuarios").update({ ...dados }).where({ id: filtro.id })
        return db("usuarios").where({ id }).first()
    }
}