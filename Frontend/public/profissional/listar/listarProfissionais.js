import { URL_BASE, URL_GET_LISTAR_PROFISSIONAIS, END_SERV_BACKEND } from "../../constantes.js";

$( document ).ready(async function() {
    let profissionais = await getProfissionais();
    await montaTabelaProfissionais(profissionais);
    $('#btnPesquisarProfissional').on("click", function(){
        let nomeProfissional = $('#pesquisaNomeProfissional').val();
        if(!nomeProfissional){
            alert("Informe o nome do profissional")
        }
    });
});


async function montaTabelaProfissionais(profissionais){
    for(let i = 0; i < profissionais.length; i++){
        let profissional = profissionais[i];
       $('#tbodyProfissional').append(`
            <tr>
            <td>${profissional.idProfissional}</td>
            <td>${profissional.nomeProfissional}</td>
            <td>${profissional.especialidadeProfissional}</td>
            <td>
                <a href="/profissional/visualizar/${profissional.idProfissional}">
                <button type="button" class="btn btn-primary m-0">
                    <i class="bi bi-eye"></i>
                    Visualizar
                </button>
                </a>
                <a href="/profissional/editar/${profissional.idProfissional}">
                <button type="button" class="btn btn-warning m-0" >
                    <i class="bi bi-pencil"></i>
                    Editar
                </button>
                </a>
                <a href="/profissional/excluir/${profissional.idProfissional}">
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

async function getProfissionais(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROFISSIONAIS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}