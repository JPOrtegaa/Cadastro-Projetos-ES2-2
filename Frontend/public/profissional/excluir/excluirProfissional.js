import { URL_BASE, URL_GET_PROFISSIONAL, URL_GET_LISTAR_GENEROS, URL_GET_LISTAR_RACAS, END_SERV_BACKEND } from "../../constantes.js";
let todasAsRacas = []
let todosOsGeneros = []

$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    let profissional = await getProfissional(id);

    await getRacas();
    await getGeneros();

    $("#idProfissional").val(profissional.idProfissional)
    $("#nomeProfissional").val(profissional.nomeProfissional)
    $("#enderecoProfissional").val(profissional.enderecoProfissional)
    $("#dataNascimentoProfissional").val(profissional.dataNascimento)
    $("#especialidadeProfissional").val(profissional.especialidadeProfissional)
    $("#generoProfissional").val(profissional.generoProfissional.nomeGenero)
    $("#racaProfissional").val(profissional.racaProfissional.nomeRaca)


    $("#linkExclusaoItem").on("click", function(){
        let v = confirm("Deseja excluir o profissional?");
        if(v == true){
            excluirProfissional(id);
        }
    })
});


async function getProfissional(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_PROFISSIONAL}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}



async function excluirProfissional(id){
    let nome = $("#nomeProfissional").val()
    let endereco = $("#enderecoProfissional").val()
    let dataNascimento = $("#dataNascimentoProfissional").val()
    let genero = getGeneroPeloNome($("#generoProfissional").val())
    let raca = getRacaPeloNome($("#racaProfissional").val())
    let especialidade = $("#especialidadeProfissional").val()

    let corpoDaRequisicao = {
        idProfissional: id,
        nomeProfissional: nome,
        dataNascimento: dataNascimento,
        enderecoProfissional: endereco,
        generoProfissional:{
            idGenero: genero.idGenero,
            nomeGenero: genero.nomeGenero
        },
        racaProfissional:{
            idRaca:raca.idRaca,
            nomeRaca:raca.nomeRaca
        },
        especialidadeProfissional: especialidade,
        listaTimes: null
    };  

    let url = URL_BASE + "/deleteReq"
    let urlBackend = `${END_SERV_BACKEND}/profissional/deletar`

    console.log(corpoDaRequisicao)

    try {
        const response = await axios.delete(url, {data: {
            url: urlBackend,
            source: corpoDaRequisicao
          }});
        if (response.status == 200){ 
            alert("Salvo com sucesso!");
            window.location.href = "/profissional/listar"
        }
    } catch (error) { alert('Erro ao salvar alterações: ' + error); }
}


function getGeneroPeloNome(nomeGenero){
    for(let i = 0; i < todosOsGeneros.length; i++){
        if(todosOsGeneros[i].nomeGenero == nomeGenero)
            return todosOsGeneros[i]
    }
    return null
}

function getRacaPeloNome(nomeRaca){
    for(let i = 0; i < todasAsRacas.length; i++){
        if(todasAsRacas[i].nomeRaca == nomeRaca)
            return todasAsRacas[i]
    }
    return null
}


async function getRacas(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_RACAS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    todasAsRacas = data;
    return data;
}


async function getGeneros(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_GENEROS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    todosOsGeneros = data;
    return data;
}