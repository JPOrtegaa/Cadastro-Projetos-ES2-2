import { URL_BASE, URL_GET_PROJETO, END_SERV_BACKEND} from "../../constantes.js";
$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    $("#linkEdicaoItem").attr("href",`/projeto/editar/${id}`)
    let projeto = await getInfo(id);
    $("#idProjeto").val(projeto.idProjeto)
    $("#nomeProjeto").val(projeto.nomeProjeto)
    $("#nomeCliente").val(projeto.nomeCliente)
    $("#objetivoProjeto").val(projeto.objetivoProjeto)
    $("#dataInicioProjeto").val(projeto.dataInicio)
    $("#dataFimProjeto").val(projeto.dataTermino)
    $("#valorProjeto").val(projeto.valorProjeto)
    $("#timeResponsavelProjeto").val(projeto.time.nomeTime);
});


async function getInfo(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_PROJETO}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;

}

