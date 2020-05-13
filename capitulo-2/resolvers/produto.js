module.exports={
    precoComDesconto(produto) {
        if (produto.desconto == null) {
            return produto.preco;
        }
        return produto.preco - produto.desconto;
    }
};