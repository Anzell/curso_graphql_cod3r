
const usuarios = [
    {
        id: 1,
        nome: "João silva",
        email: "joaoSilva@hotmail.com",
        idade: 29,
        perfil_id:1,
        status:"ATIVO"
    },
    {
        id: 2,
        nome: "Mateus sad",
        email: "mateus@hotmail.com",
        idade: 21,
        perfil_id:2,
        status:"INATIVO"
    },
    {
        id: 3,
        nome: "Ana",
        email: "ana@hotmail.com",
        idade: 23,
        perfil_id:1,
        status:"BLOQUEADO"
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

module.exports={usuarios,perfis};