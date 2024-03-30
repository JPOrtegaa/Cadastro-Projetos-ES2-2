import { URL_BASE, URL_GET_LISTAR_PROJETOS, END_SERV_BACKEND } from "../../constantes.js";

$( document ).ready(async function() {
    let projetos = await getProjetos();
    await montaTabelaProjetos(projetos);
    $('#btnPesquisarProjeto').on("click", function(){
        let nomeProjeto = $('#pesquisaNomeProjeto').val();
        if(!nomeProjeto){
            alert("Informe o nome do Projeto")
        }
    });
});


async function montaTabelaProjetos(projetos){
    for(let i = 0; i < projetos.length; i++){
        let projeto = projetos[i];
       $('#tbodyProjeto').append(`
            <tr>
            <td>${projeto.idProjeto}</td>
            <td>${projeto.nomeProjeto}</td>
            <td>${projeto.time.nomeTime}</td>
            <td>
                <a href="/projeto/visualizar/${projeto.idProjeto}">
                <button type="button" class="btn btn-primary m-0">
                    <i class="bi bi-eye"></i>
                    Visualizar
                </button>
                </a>
                <a href="/projeto/editar/${projeto.idProjeto}">
                <button type="button" class="btn btn-warning m-0" >
                    <i class="bi bi-pencil"></i>
                    Editar
                </button>
                </a>
                <a href="/projeto/excluir/${projeto.idProjeto}">
                <button class="btn btn-danger" type="button">
                <i class="bi bi-trash"></i>
                    Excluir
                </button>
                </a>
            </td>
        </tr>
       `)
    }
}

async function getProjetos(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROJETOS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}