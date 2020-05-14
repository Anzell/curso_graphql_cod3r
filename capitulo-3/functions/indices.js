module.exports = {
    indiceUsuario(filtro, usuarios) {
        if (!filtro) {
            return -1;
        }
        const { id, email } = filtro;
        if (id) {
            return usuarios.findIndex(u => u.id === id);
        } else if (email) {
            return usuarios.findIndex(u => u.email === email);
        }
        return -1;
    },
    indicePerfil(filtro, perfis) {
        if (!filtro) {
            return -1;
        }
        const { id } = filtro;
        if (id) {
            return perfis.findIndex(p => p.id === id);
        }
        return -1;
    }




}