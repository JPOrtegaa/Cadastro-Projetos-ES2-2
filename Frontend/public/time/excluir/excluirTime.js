import { URL_BASE, URL_GET_TIME, URL_GET_LISTAR_PROJETOS, URL_GET_LISTAR_PROFISSIONAIS, END_SERV_BACKEND } from "../../constantes.js";

let listadeProfissionaisDoTime = []
let listadeProfissionaisCompleta = []
let idTime = null

$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    let time = await getTime(id);
    idTime = time.idTime
    let profissionaisT = await getTodosOsProfissionais();
    $("#idTime").val(time.idTime);
    $("#nomeTime").val(time.nomeTime)
    await montaTabelaProfissionaisTime(time.listaProfissional);

    $("#linkExclusaoItem").on("click", function(){
        let v = confirm("Deseja excluir o time?");
        if(v == true){
            excluirTime();
        }
    })

});


async function montaTabelaProfissionaisTime(profissionaisTime){
    for(let i = 0; i < profissionaisTime.length; i++){
        let profissional = profissionaisTime[i];
        listadeProfissionaisDoTime.push(profissional.nomeProfissional)
       $('#tbodyVisualizarProfissional').append(`
            <tr>
                <td>${profissional.nomeProfissional}</td>
            </tr>
       `)
    }
}

async function getTime(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_TIME}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}

async function getTodosOsProfissionais(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROFISSIONAIS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    listadeProfissionaisCompleta = data;
    return data;
}



async function excluirTime(){
    let projetosDoTime = await getProjetos(idTime);
    if(projetosDoTime.length > 0){
        alert(`Não é possivel excluir este time, ele possui projetos ativos:\n${projetosDoTime}`)
    }

    else{

        let nomeTime =  $("#nomeTime").val();
        let listaProfissional = [];
    
        for(let i = 0; i < listadeProfissionaisDoTime.length; i++){
            listaProfissional.push(await getProfissionalPeloNome(listadeProfissionaisDoTime[i]))
        }
    
        let corpoDaRequisicao = {
            idTime: idTime,
            nomeTime: nomeTime,
            listaProfissional: listaProfissional,
        }
        console.log(corpoDaRequisicao)
    
        let url = URL_BASE + "/deleteReq"
        let urlBackend = `${END_SERV_BACKEND}/time/deletar`
    
        try {
            const response = await axios.delete(url, {data: {
                url: urlBackend,
                source: corpoDaRequisicao
              }});
            if (response.status == 200){ 
                alert("Salvo com sucesso!");
                window.location.href = "/time/listar"
            }
        } catch (error) { alert('Erro ao salvar alterações: ' + error); }
    }
}


async function getProfissionalPeloNome(nomeProfissional){
    for(let i = 0; i < listadeProfissionaisCompleta.length; i++){
        if(listadeProfissionaisCompleta[i].nomeProfissional == nomeProfissional)
            return listadeProfissionaisCompleta[i];
    }
    return null
}

async function getProjetos(idTime){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROJETOS}`
    let data = null
    let retData = []
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {
        data = response.data
        for(let i =0; i < data.length; i++)
            if(data[i].time.idTime == idTime)
                retData.push(data[i].nomeProjeto)
    });
    return retData;
}