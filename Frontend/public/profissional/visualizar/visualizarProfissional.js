import { URL_BASE, URL_GET_PROFISSIONAL, END_SERV_BACKEND } from "../../constantes.js";
$( document ).ready(async function() {
    let id = window.location.pathname.split("/")[3]
    $("#linkEdicaoItem").attr("href",`/profissional/editar/${id}`)
    let profissional = await getInfo(id);
    $("#idProfissional").val(profissional.idProfissional);
    $("#nomeProfissional").val(profissional.nomeProfissional);
    $("#enderecoProfissional").val(profissional.enderecoProfissional);
    $("#dataNascimentoProfissional").val(profissional.dataNascimento);
    $("#generoProfissional").val(profissional.generoProfissional.nomeGenero);
    $("#racaProfissional").val(profissional.racaProfissional.nomeRaca);
    $("#especialidadeProfissional").val(profissional.especialidadeProfissional);
});


async function getInfo(id){
    let urlFront =  `${URL_BASE}/getReq`;
    let urlBackend = `${END_SERV_BACKEND}${URL_GET_PROFISSIONAL}/${id}`
    let data = null
    await axios.get(`${urlFront}?urlReq=${urlBackend}`).then(async (response) => {data = response.data});
    return data;

}

