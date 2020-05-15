const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db("perfis");
    },
    async perfil(_, { filtro }) {
        const { id, nome } = filtro
        return await db("perfis").where({ id, nome }).first()
    }
}