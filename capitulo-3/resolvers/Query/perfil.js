const { perfis } = require("../../data/db");
const { indicePerfil } = require("../../functions/indices")

module.exports = {
    perfis() {
        return perfis
    },
    perfil(_, { filtro }) {
        const i = indicePerfil(filtro, perfis);
        return perfis[i];
    }
}