const { usuarios, proximoId } = require("../../data/db");
const { indiceUsuario } = require("../../functions/indices")

module.exports = {
    //{nome,email,idade} ou então args
    novoUsuario(_, { dados }) {
        const emailExistente = usuarios.some((u) => u.email === dados.email);
        if (emailExistente) {
            throw new Error("E-mail já cadastrado");
        }
        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: "ATIVO",
        };

        usuarios.push(novo);
        return novo;
    },

    excluirUsuario(_, { filtro }) {
        const i = indiceUsuario(filtro, usuarios);
        if (i < 0) {
            return null;
        }
        const excluidos = usuarios.splice(i, 1);
        return excluidos ? excluidos[0] : null;
    },

    alterarUsuario(_, { filtro, novosDados }) {
        const i = indiceUsuario(filtro, usuarios);
        if (i < 0) {
            return null;
        }

        const usuario = {
            ...usuarios[i],
            ...novosDados
        }

        usuarios.splice(i, 1, usuario);
        return usuario;

        //OU
        //Como nome e email são obrigatórios no schema de Usuario, eles vão dar problema caso não sejam passados
        //usuarios[i].nome=args.nome
        //usuarios[i].email=args.email
        //if(args.idade){
        //usuarios[i].idade=args.idade
        // }
        //return usuarios[i]

    }
};
