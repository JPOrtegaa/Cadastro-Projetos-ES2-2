import { URL_BASE, URL_GET_LISTAR_RACAS, URL_GET_PROFISSIONAL, URL_GET_LISTAR_GENEROS,END_SERV_BACKEND } from "../../constantes.js";
let todasAsRacas = []
let todosOsGeneros = []
$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    $("#linkExclusaoItem").attr("href",`/profissional/excluir/${id}`)

    await getRacas();
    await getGeneros();

    let profissional = await getProfissional(id);
    console.log(profissional)

    $("#nomeProfissional").val(profissional.nomeProfissional)
    $("#enderecoProfissional").val(profissional.enderecoProfissional)
    $("#dataNascimentoProfissional").val(profissional.dataNascimento)
    


    await montaSelectRacas(todasAsRacas);
    await montaSelectGeneros(todosOsGeneros);
    $("#especialidadeProfissional").val(profissional.especialidadeProfissional)

    $("#generoProfissional").val(profissional.generoProfissional.nomeGenero)
    $("#racaProfissional").val(profissional.racaProfissional.nomeRaca)
    

    $("#salvarItem").on("click", function(){
        salvarAlteracoesProfissional(id) 
    })

    $("#nomeProfissional").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })
    
    $("#enderecoProfissional").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })
    $("#dataNascimentoProfissional").on("change",function (){
            $(this).removeClass("invalido");
    })
});

async function getProfissional(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_PROFISSIONAL}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}

async function salvarAlteracoesProfissional(id){
    if(!(await validarCampos())){
        alert("Todos os campos são obrigatórios!")
    }
    else{
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
    
    
        console.log(corpoDaRequisicao)
    
        let url = URL_BASE + "/putReq"
        let urlBackend = `${END_SERV_BACKEND}/profissional/atualizar`
    
        try {
            const response = await axios.put(url, {urlBackend,corpoDaRequisicao});
            if (response.status == 200){ 
                alert("Salvo com sucesso!"); 
                window.location.href = "/profissional/listar"
            }
            
        } catch (error) { alert('Erro ao salvar alterações: ' + error); }
    }

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

async function montaSelectRacas(todasAsRacas){
    for(let i = 0; i < todasAsRacas.length;i++){
        let raca = todasAsRacas[i];
        $("#racaProfissional").append(` <option>${raca.nomeRaca}</option>`)
    }    
}

async function montaSelectGeneros(todosOsGeneros){
    for(let i = 0; i < todosOsGeneros.length;i++){
        let genero = todosOsGeneros[i];
        $("#generoProfissional").append(` <option>${genero.nomeGenero}</option>`)
    }    
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

async function validarCampos(){
    let valido = true;
    let nomeProfissional = $("#nomeProfissional").val()
    let enderecoProfissional = $("#enderecoProfissional").val()
    let dataNascimentoProfissional = $("#dataNascimentoProfissional").val() 
    let generoProfissional = $("#generoProfissional").val()
    let racaProfissional = $("#racaProfissional").val()
    let especialidadeProfissional = $("#especialidadeProfissional").val()

    if (!nomeProfissional || nomeProfissional.trim() == ""){
        $("#nomeProfissional").addClass("invalido");
        valido = false;
    }

    if (!enderecoProfissional || enderecoProfissional.trim() == ""){
        $("#enderecoProfissional").addClass("invalido");
        valido = false;
    }

    if (!dataNascimentoProfissional || dataNascimentoProfissional == ""){
        $("#dataNascimentoProfissional").addClass("invalido");
        valido = false;
    }

    if (!generoProfissional || generoProfissional.trim() == ""){
        $("#generoProfissional").addClass("invalido");
        valido = false;
    }

    if (!racaProfissional || racaProfissional.trim() == ""){
        $("#racaProfissional").addClass("invalido");
        valido = false;
    }

    if (!especialidadeProfissional  || especialidadeProfissional.trim() == ""){
        $("#especialidadeProfissional").addClass("invalido");
        valido = false;
    }

    if(valido){
        return true;
    }
        
    return false
}