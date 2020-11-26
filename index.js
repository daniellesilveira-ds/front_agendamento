function autenticar(){
var txtLogin = document.getElementById("txtLogin").value;
var txtSenha = document.getElementById("txtSenha").value;
console.log("DEBUG = digitados: "+txtLogin +" / "+ txtSenha);
var msgBody = {
    email : txtLogin,
    racf  : txtLogin,
    senha : txtSenha
};

var cabecalho = {
    method : "POST",
    body   : JSON.stringify(msgBody),
    headers : {
        "content-type" : "application/json"
    }
};

fetch("http://localhost:8080/login", cabecalho).then(resposta=>trataresposta(resposta));



}

function trataresposta(resposta) {
    if (resposta.status == 200){
        resposta.json().then(user => efetivaLogin(user))

    }
    else if (resposta.status == 401){
        document.getElementById("msg").innerHTML = "Senha Inválida";
    }

    else if (resposta.status == 404){
        document.getElementById("msg").innerHTML = "Usuário não encontrado";
    }

    else  {
        document.getElementById("msg").innerHTML = "Erro Desconhecido";
    }
}

function efetivaLogin(user){
    console.log("usuário recebido");
    localStorage.setItem("userSCHED", JSON.stringify(user));
    window.location = "relatorio.html"

}