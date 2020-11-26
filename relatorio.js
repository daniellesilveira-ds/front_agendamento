function validaUser(){

    var user = localStorage.getItem("userSCHED");

    if (!user){  //se o objeto nao existe no localStorage, redireciona para o index
        window.location = "index.html";
    }

    var userObj = JSON.parse(user); // "desconverto" a String JSON para um objeto javascript

    document.getElementById("fotoUser").innerHTML = `<img src="${userObj.linkFoto}" width="100%">`;
    document.getElementById("bioUser").innerHTML = `<h4> ${userObj.nome} </h4>
                                                    <p> Email: ${userObj.email} </p>
                                                    <p> Racf : ${userObj.racf} </p>
                                                    `;
    carregaAgencias();
}


function carregaAgencias(){
    // 

    /*
    pensando "estruturado"
    res = fetch("http://localhost:8080/agencias)
    lista = res.json();
    preenche(lista);
    */
    fetch("http://localhost:8080/Agencias")
         .then(res => res.json())   // se eu receber uma resposta, vou ter q extrair o JSON da resposta
         .then(lista => preenche(lista)) // se der cert, passo isso para uma função que irá gerar dinamicamente meu select
}

function preenche(lista){

    var htmlSelect = `<select id="txtAgencia" class="form-control">`;

    for (i=0; i<lista.length; i++){
        var ag = lista[i]; // apenas para facilitar a manipulacao
        htmlSelect = htmlSelect + `<option value="${ag.id}">${ag.nome}</option>`;
    }
    htmlSelect = htmlSelect + `</select>`;
    document.getElementById("selectAgencia").innerHTML =htmlSelect;
}

function gerarRelatorio(){
    // antes de mais nada....
    var opcao = 0;
    var opAg, opData, opCli;
    if (document.getElementById("chkAgencia").checked){
        opAg = 1;
    }
    else{
        opAg = 0;
    }

    if (document.getElementById("chkData").checked){
        opData = 2;
    }
    else{
        opData = 0;
    }

    if (document.getElementById("chkCliente").checked){
        opCli = 4;
    }
    else{
        opCli = 0;
    }

    opcao = opAg + opData + opCli;
    console.log("Opcao selecionada = "+opcao);

    fetch("http://localhost:8080/agendamentos")
    .then(res => res.json())
    .then(lista => preencherRelatorio(lista));
}
function preencherRelatorio(lista){
    var rel="";
    for (i=0; i<lista.length; i++) {
        var ag = lista[i];

        rel = rel + `<div class="row linharelatorio">
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1 col-xl-2">
           ${ag.dataAgendamento}
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1 col-xl-1">
           ${ag.horaAgendamento}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-4 col-xl-4">
           ${ag.nomeCliente}
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
           ${ag.emailCliente}
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 col-xl-2">
           ${ag.celularCliente}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
           Agencia: ${ag.agencia.nome}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
           ${ag.observacao}
        </div>
    </div>`;
}
document.getElementById("relatorio").innerHTML = rel;

}

    


