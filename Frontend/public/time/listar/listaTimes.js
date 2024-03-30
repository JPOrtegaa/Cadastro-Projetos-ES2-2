import { URL_BASE, URL_GET_LISTAR_TIMES, END_SERV_BACKEND } from "../../constantes.js";

$( document ).ready(async function() {
    let times = await getTimes();
    await montaTabelaTimes(times);
    $('#btnPesquisarTime').on("click", function(){
        let nomeTime = $('#pesquisaNomeTime').val();
        if(!nomeTime){
            alert("Informe o nome do Time")
        }
    });
});


async function montaTabelaTimes(times){
    for(let i = 0; i < times.length; i++){
        let time = times[i];
        if(time.idTime != 8)
        $('#tbodyTime').append(`
                <tr>
                <td>${time.idTime}</td>
                <td>${time.nomeTime}</td>
                <td>
                    <a href="/time/visualizar/${time.idTime}">
                    <button type="button" class="btn btn-primary m-0">
                        <i class="bi bi-eye"></i>
                        Visualizar
                    </button>
                    </a>
                    <a href="/time/editar/${time.idTime}">
                    <button type="button" class="btn btn-warning m-0" >
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>
                    </a>
                    <a href="/time/excluir/${time.idTime}">
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

async function getTimes(){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_LISTAR_TIMES}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;
}