const db = require('../../config/db')

module.exports = {
    async perfis(usuario) {
        const usuario = await db("usuarios").join("usuarios_perfis", "usuarios.id", "=", "usuarios_perfis.usuario_id")
        console.log("chegou")
        console.log(usuario)
    }
}