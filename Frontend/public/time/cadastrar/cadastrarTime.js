import { URL_BASE, URL_GET_LISTAR_PROFISSIONAIS, END_SERV_BACKEND } from "../../constantes.js";

let listadeProfissionaisDoTime = []
let listadeProfissionaisCompleta = []
let lastId = 0;

$( document ).ready(async function() {
    let todosOsProfissionais = await getTodosOsProfissionais();
    await montaSelectProfissionais(todosOsProfissionais)


    $('#listaDeTodosOsProfissionais').change(function(){ 
        var value = $(this).val();
        if(value)
            adicionaNaListaDeProfissionaisDoTime(value)
    });


    $('#tbodyProfissional').on("click", ".removerProfissional", function(){
        let parent = $(this).closest("tr");
        remover(parent[0].id)
    });


    $("#salvarItem").on("click", function (){
        salvarAlteracoesTime() 
    })


    $("#nomeTime").on("change",function (){
        if($(this).val().length > 0)
            $(this).removeClass("invalido");
    })
});

function adicionaNaListaDeProfissionaisDoTime(nomeProfissional){
    if(listadeProfissionaisDoTime.includes(nomeProfissional)){
        alert("Profissional já está no time")
    }
    else{
        listadeProfissionaisDoTime.push(nomeProfissional)
        $('#tbodyProfissional').append(`
            <tr class="row${++lastId}" id="${lastId}">
                <td id="tbNome${lastId}">${nomeProfissional}</td>
                <td ><button type="button" class="btn btn-danger removerProfissional"><i class="bi bi-trash"></i> </button></td>
            </tr>
        `)
    }
}


function remover(id){
    let nome = $(`#tbNome${id}`).text()
    console.log(nome)
    const idx = listadeProfissionaisDoTime.indexOf(nome);
    listadeProfissionaisDoTime.splice(idx,1);
    $(`#${id}`).remove();
}



async function montaSelectProfissionais(listaDeProfissionais){
    for(let i = 0; i < listaDeProfissionais.length; i++){
        let profissional = listaDeProfissionais[i];
       $('#listaDeTodosOsProfissionais').append(`
            <option>${profissional.nomeProfissional}</option>
       `)
    }

}


async function getTodosOsProfissionais(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_PROFISSIONAIS}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    listadeProfissionaisCompleta = data;
    return data;
}


async function salvarAlteracoesTime(){
    if(await validarCampos()){
        let nomeTime =  $("#nomeTime").val();
        let listaProfissional = [];
        for(let i = 0; i < listadeProfissionaisDoTime.length; i++){
            listaProfissional.push(await getProfissionalPeloNome(listadeProfissionaisDoTime[i]))
        }
    
        let corpoDaRequisicao = {
            nomeTime: nomeTime,
            listaProfissional: listaProfissional,
        }

        let url = URL_BASE + "/postReq"
        let urlBackend = `${END_SERV_BACKEND}/time/inserir`
        
        
        try {
            const response = await axios.post(url, {urlBackend,corpoDaRequisicao});
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

async function validarCampos(){
    let valido = true;
    let nomeTime = $("#nomeTime").val();

    if (!nomeTime || nomeTime.trim() == ""){
        $("#nomeTime").addClass("invalido");
            valido = false;
    }

    if(valido){
        return true;
    }

    alert("Todos os campos são obrigatórios!")
    return false
}