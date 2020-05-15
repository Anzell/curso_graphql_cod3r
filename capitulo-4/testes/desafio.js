const db = require("../config/db");

async function salvarUsuario(nome, email, senha) {
  const { quantidade } = await db("usuarios")
    .where({ email })
    .count("* as quantidade")
    .first();

  if (quantidade === 0) {
    return await db("usuarios").insert({ nome, email, senha });
  }

  await db("usuarios").update({ nome, senha }).where({ email });

  return await db("usuarios").where({ email }).first();
  //perfil usuario  

  //solução professor
  /*
    let usuario = awair db("usuarios").where({email}).first()
    if(!usuario){
        let [id]= await db("usuarios").insert({nome,email,senha})
        usuario = await db("usuarios").where({id}).first()
        
    }else{
        await db("usuarios").where({id:usuario.id}).update({nome,email,senha})
        usuario ={...usuario,nome,email,senha}
    }

    return usuario


  */
}

async function salvarPerfil(nome, rotulo) {
  const { quantidade } = await db("perfis")
    .where({ nome })
    .count("* as quantidade")
    .first();

  if (quantidade > 0) {
    return await db("perfis").where({ nome }).first();
  }

  return await db("perfis").insert({ nome, rotulo });
  //return perfil

  /*
  solução professor
    let perfil = await db("perfis").where({nome}).first()
    
    if(!perfil){
        let [ id] = await db("perfis").inser({nome,rotulo})
        perfil = await db("perfis").where({id}).first()
    
    }else{
        await db("perfis").where({id:perfil.id}).update({id:perfil.id})
        perfil ={...perfil,nome,rotulo}
    }

    return perfil

  */
}

async function adicionarPerfis(usuario, ...perfis) {
  const usuarioEncontrado = await db("usuarios")
    .where({ email: usuario.email })
    .first();
  for (perfil of perfis) {
    const { perfilEncontrado } = await db("usuarios_perfis")
      .where({
        usuario_id: usuarioEncontrado.id,
        perfil_id: perfil.id,
      })
      .count("* as perfilEncontrado")
      .first();
    if (perfilEncontrado === 0) {
      await db("usuarios_perfis").insert({
        usuario_id: usuarioEncontrado.id,
        perfil_id: perfil.id,
      });
    }
  }
  /*
  const usuario_id=usuario.id
  await db("usuarios_perfis")
    .where({usuario_id})
    .delete()
  
  for(pefil of perfis){
      const perfil_id = perfil.id
      await db("usuarios_perfis").insert({usuario_id,perfil_id})
  }
  */
}

async function executar() {
  const usuario = await salvarUsuario("asdsa", "ana@empresa.com", "123456");
  const perfilA = await salvarPerfil("rh", "Pessoal");
  const perfilB = await salvarPerfil("fin", "Financeiro");
  console.log(usuario);
  console.log(perfilA);
  console.log(perfilB);
  await adicionarPerfis(usuario, perfilA, perfilB);
}

executar()
  .catch((res) => console.log(res))
  .finally(() => db.destroy());
