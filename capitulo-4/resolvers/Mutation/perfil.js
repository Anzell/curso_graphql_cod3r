const db = require('../../config/db')

module.exports = {
    async novoPerfil(_, { dados }) {
        const id = await db("perfis").insert({ ...dados });
        return await db("perfis").where({ id }).first()
    },
    async excluirPerfil(_, { filtro }) {
        const id = await db("perfis").update({ ativo: 0 }).where({ id: filtro.id })
        return await db("perfis").where({ id }).first()
    },
    async alterarPerfil(_, { filtro, dados }) {
        const id = await db("perfis").update({ ...dados }).where({ id: filtro.id })
        return await db("perfis").where({ id }).first()
    }
}