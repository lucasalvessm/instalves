import {List} from 'immutable';

function trocaFoto(lista,fotoId,callbackAtualizaPropriedades){

    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);        
    const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo);

    const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);

    return lista.set(indiceDaLista,fotoEstadoNovo);    
}

export function timeline(state=new List(),action){

    switch (action.type) {

        case "LISTAGEM":
            return new List(action.fotos);        

        case "COMENTARIO":
            return trocaFoto(state,action.fotoId,fotoEstadoAntigo => {
                const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario); 
                return {comentarios:novosComentarios};
            });

        case "LIKE":
             return trocaFoto(state,action.fotoId,fotoEstadoAntigo => {
                const likeada = !fotoEstadoAntigo.likeada;

                const liker = action.liker;
                const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === liker.login);

                let novosLikers;
                if(possivelLiker === undefined){
                    novosLikers = fotoEstadoAntigo.likers.concat(liker);
                } else {
                    novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login !== liker.login);            
                }

                return {likeada,likers:novosLikers};
            });
            
        default:
            return state;
    }
}