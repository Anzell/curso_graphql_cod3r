const { ApolloServer, gql } = require("apollo-server");

const usuarios = [
    {
        id: 1,
        nome: "João silva",
        email: "joaoSilva@hotmail.com",
        idade: 29,
        perfil_id:1
    },
    {
        id: 2,
        nome: "Mateus sad",
        email: "mateus@hotmail.com",
        idade: 21,
        perfil_id:2
    },
    {
        id: 3,
        nome: "Ana",
        email: "ana@hotmail.com",
        idade: 23,
        perfil_id:1
    }

];

const perfis = [
    {
        id: 1,
        nome: "Comum"
    },
    {
        id: 2,
        nome: "Administrador"
    }
]

const typeDefs = gql`
    scalar Date

    type Perfil{
        id:ID
        nome:String
    }

    type Query{
        nome:String!
        horaCerta:Date!
        usuarioLogado:Usuario
        produtoEmDestaque:Produto
        numerosMegaSena:[Int!]!
        usuarios:[Usuario]
        usuario(id:ID):Usuario
        perfis:[Perfil]
        perfil(id:Int):Perfil
    }

    type Usuario{
        id: ID
        nome: String!
        email: String!
        idade: Int
        perfil:Perfil
    }

    type Produto{
        nome:String!
        preco:Float!
        desconto:Float
        precoComDesconto:Float
    }
`;

const resolvers = {

    Usuario:{
        perfil(usuario){
            
        const selecionados = perfis.filter(p=>p.id==usuario.perfil_id)
        return selecionados ? selecionados [0] :null;
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto == null) {
                return produto.preco;
            }
            return produto.preco - produto.desconto;
        }
    },

    Query: {
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
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log("Servidor rodando na porta", url);
})
