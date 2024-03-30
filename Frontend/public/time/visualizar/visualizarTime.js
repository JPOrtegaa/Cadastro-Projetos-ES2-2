import { URL_BASE, URL_GET_TIME, END_SERV_BACKEND } from "../../constantes.js";

$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    $("#linkEdicaoItem").attr("href",`/time/editar/${id}`)
    let time = await getTime(id);
    $("#idTime").val(time.idTime);
    $("#nomeTime").val(time.nomeTime)
    await montaTabelaProfissionaisTime(time.listaProfissional);
});


async function montaTabelaProfissionaisTime(profissionaisTime){
    for(let i = 0; i < profissionaisTime.length; i++){
        let profissional = profissionaisTime[i];
        console.log(profissional)
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