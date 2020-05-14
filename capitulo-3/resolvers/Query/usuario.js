const { usuarios } = require('../../data/db')
const { indiceUsuario } = require("../../functions/indices")

module.exports = {
    usuarios() {
        return usuarios
    },
    usuario(_, { filtro }) {
        const i = indiceUsuario(filtro, usuarios)
        if (i < 0) {
            return null;
        }
        return usuarios[i]
        // return sels ? sels[0] : null
    }
}