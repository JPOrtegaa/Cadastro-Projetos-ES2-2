import { URL_BASE, URL_GET_PROJETO, URL_GET_LISTAR_TIMES, END_SERV_BACKEND } from "../../constantes.js";

let listaDeTodosOsTimes = []

$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    $("#linkEdicaoItem").attr("href",`/projeto/editar/${id}`)
    let projeto = await getInfo(id);
    listaDeTodosOsTimes = await getTimes();
    $("#idProjeto").val(projeto.idProjeto)
    $("#nomeProjeto").val(projeto.nomeProjeto)
    $("#nomeCliente").val(projeto.nomeCliente)
    $("#objetivoProjeto").val(projeto.objetivoProjeto)
    $("#dataInicioProjeto").val(projeto.dataInicio)
    $("#dataFimProjeto").val(projeto.dataTermino)
    $("#valorProjeto").val(projeto.valorProjeto)
    $("#timeResponsavelProjeto").val(projeto.time.nomeTime);

    $("#linkExclusaoItem").on("click", function(){
        let v = confirm("Deseja excluir o profissional?");
        if(v == true){
            excluirProjeto(id);
        }
    })

});


async function getInfo(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_PROJETO}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;

}


async function getTimes(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_TIMES}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}



async function excluirProjeto(id){
    let nomeProjeto = $("#nomeProjeto").val()
    let nomeCliente = $("#nomeCliente").val()
    let objetivoProjeto = $("#objetivoProjeto").val()
    let dataInicio = $("#dataInicioProjeto").val()
    let dataTermino = $("#dataFimProjeto").val()
    let valorProjeto = $("#valorProjeto").val()
    let time = await getTimePeloNome($("#timeResponsavelProjeto").val())
  
    let corpoDaRequisicao = {
        idProjeto: id,
        nomeProjeto: nomeProjeto,
        nomeCliente: nomeCliente,
        objetivoProjeto: objetivoProjeto,
        dataInicio: dataInicio,
        dataTermino: dataTermino,
        valorProjeto:  valorProjeto,
        time:time
    };

    console.log(corpoDaRequisicao)

    let url = URL_BASE + "/deleteReq"
    let urlBackend = `${END_SERV_BACKEND}/projeto/deletar`
    
    try {
        const response = await axios.delete(url, {data: {
            url: urlBackend,
            source: corpoDaRequisicao
          }});
        if (response.status == 200){ 
            alert("Salvo com sucesso!");
            window.location.href = "/projeto/listar"
         }
    } catch (error) { alert('Erro ao salvar alterações: ' + error); }
}



async function getTimePeloNome(nomeTime){
    for(let i = 0; i < listaDeTodosOsTimes.length; i++){
        if(listaDeTodosOsTimes[i].nomeTime == nomeTime)
            return listaDeTodosOsTimes[i];
    }
    return null
}