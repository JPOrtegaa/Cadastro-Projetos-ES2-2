import {URL_BASE, URL_GET_LISTAR_TIMES, END_SERV_BACKEND, URL_GET_LISTAR_PROJETOS} from "../../constantes.js";
let listaDeTodosOsTimes = []
let listaDeClientes = []


$( document ).ready(async function() {
    listaDeTodosOsTimes = await getTimes();
    await montaSelectTimes(listaDeTodosOsTimes);
    listaDeClientes = await getClientes();
    await montaSelectClientes();
    
    $("#salvarItem").on("click", function (){
        salvarAlteracoesprojeto() 
    })

    $("#btnAddCliente").on("click", function (){
        let cliente = prompt("Nome do cliente").trim();
        if(cliente)
            adicionaCliente(cliente)
    })


    $("#nomeProjeto").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })

    $("#objetivoProjeto").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })

    $("#dataInicioProjeto").on("change",function (){
        $(this).removeClass("invalido");
    })

    $("#dataFimProjeto").on("change",function (){
        $(this).removeClass("invalido");
    })

    $("#valorProjeto").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })



});


async function adicionaCliente(cliente){
    if(!(presenteNaLista(listaDeClientes,cliente))){
        listaDeClientes.push(cliente);
        $("#nomeCliente").append(`
            <option>${cliente}</option>
        `)
    }
    else
        alert("Cliente já cadastrado")
}

function presenteNaLista(lista,item){
    for(let i = 0; i < lista.length; i++){
        if(lista[i].toLowerCase() == item.toLowerCase())
            return true;
    }
    return false
}


async function montaSelectClientes(){
    for(let i = 0; i < listaDeClientes.length; i++){
        $("#nomeCliente").append(`
        <option>${listaDeClientes[i]}</option>
        `)
    }
}


async function getClientes(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROJETOS}`
    let data = null
    let retData = []
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {
        data = response.data
        for(let i = 0; i < data.length; i++){
            if(!(retData.includes(data[i].nomeCliente)))
                retData.push(data[i].nomeCliente)
        }
    });
    return retData;
}

async function salvarAlteracoesprojeto(){
    if(await validarCampos()){
        let nomeProjeto = $("#nomeProjeto").val()
        let nomeCliente = $("#nomeCliente").val()
        let objetivoProjeto = $("#objetivoProjeto").val()
        let dataInicio = $("#dataInicioProjeto").val()
        let dataTermino = $("#dataFimProjeto").val()
        let valorProjeto = $("#valorProjeto").val()
        let time = await getTimePeloNome($("#timeResponsavelProjeto").val())
      
    
        let corpoDaRequisicao = {
            nomeProjeto: nomeProjeto,
            nomeCliente: nomeCliente,
            objetivoProjeto: objetivoProjeto,
            dataInicio: dataInicio,
            dataTermino: dataTermino,
            valorProjeto:  valorProjeto,
            time:time
    
        };
    
        let url = URL_BASE + "/postReq"
        let urlBackend = `${END_SERV_BACKEND}/projeto/inserir`
        
        try {
            const response = await axios.post(url, {urlBackend,corpoDaRequisicao});
            if (response.status == 200){ 
                alert("Salvo com sucesso!");
                window.location.href = "/projeto/listar"
             }
        } catch (error) { alert('Erro ao salvar alterações: ' + error); }
    }

}

async function montaSelectTimes(times){
    for(let i = 0; i < times.length; i++){
        let time = times[i];
        if(time.idTime != 8){
            $("#timeResponsavelProjeto").append(`
                <option>${time.nomeTime}</option>
            `)
        }

    }

}

async function getTimePeloNome(nomeTime){
    for(let i = 0; i < listaDeTodosOsTimes.length; i++){
        if(listaDeTodosOsTimes[i].nomeTime == nomeTime)
            return listaDeTodosOsTimes[i];
    }
    return null
}

async function getTimes(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_TIMES}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}

    
async function validarCampos(){
    let valido = true;
    let nomeProjeto = $("#nomeProjeto").val()
    let nomeCliente = $("#nomeCliente").val()
    let objetivoProjeto = $("#objetivoProjeto").val()
    let dataInicio = $("#dataInicioProjeto").val()
    let dataTermino = $("#dataFimProjeto").val()
    let valorProjeto = $("#valorProjeto").val()
    let time = $("#timeResponsavelProjeto").val()

    if (!nomeProjeto || nomeProjeto.trim() == ""){
        $("#nomeProjeto").addClass("invalido");
            valido = false;
    }

    if (!nomeCliente || nomeCliente.trim() == ""){
        $("#nomeCliente").addClass("invalido");
            valido = false;
    }

    if (!objetivoProjeto || objetivoProjeto.trim() == ""){
        $("#objetivoProjeto").addClass("invalido");
            valido = false;
    }

    if (!dataInicio || dataInicio == ""){
        $("#dataInicioProjeto").addClass("invalido");
            valido = false;
    }

    if (!dataTermino || dataTermino == ""){
        $("#dataFimProjeto").addClass("invalido");
            valido = false;
    }

    if (!valorProjeto || valorProjeto.trim() == ""){
        $("#valorProjeto").addClass("invalido");
            valido = false;
    }

    if (!time || time.trim() == ""){
        $("#timeResponsavelProjeto").addClass("invalido");
            valido = false;
    }

    if(valido){
        return true;
    }

    alert("Todos os campos são obrigatórios!")
    return false
}