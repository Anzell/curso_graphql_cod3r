const {usuarios,perfis} = require("../data/db");

module.exports={
    perfis() {
        return perfis;
    },
    perfil(_, { id }) {
        const selecionados = perfis.filter(u => u.id == id);
        return selecionados ? selecionados[0] : null;
    },

    usuario(_, { id }) {
        const selecionados = usuarios.filter(u => u.id == id);
        return selecionados ? selecionados[0] : null;
    },
    usuarios() {
        return usuarios;
    },

    numerosMegaSena() {
        const crescente = (a, b) => a - b;
        return Array(6).fill(0).map(e => parseInt(Math.random() * 60 + 1)).sort(crescente);
    },

    nome() {
        return "Andriél";
    },
    horaCerta() {
        return new Date;
    },

    produtoEmDestaque() {
        return {
            nome: "Tomate",
            preco: 10.00
        };
    },

    usuarioLogado(obj) {
        console.log(obj)
        return {
            id: 1,
            nome: "anderson da Web",
            email: "ander@email.com",
            idade: 23,
        }
    }
};