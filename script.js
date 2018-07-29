const casas = document.querySelectorAll(".casa");
const tabuleiro = document.querySelector("#tabuleiro");
const sectionInputs = document.querySelector("#inputs");
const botoes = document.querySelectorAll("button");
const inputs = document.querySelectorAll("#input");
const modal = document.querySelector("#winners");

let contador;
let jogador1;
let jogador2;
let simbolo1;
let simbolo2;
let vitorias1 = 0;
let vitorias2 = 0;

for(botao of botoes){
    botao.onclick = validarInicio;
}

function validarInicio(){
    if(modal.classList.contains("descendo")){
        modal.classList.remove("descendo");
    }

    for(input of inputs){
        if(inputs.value === ""){
            alert("Preencha primeiro todos os campos e só depois clique no botão.");
            return;
        }
    }
    iniciarJogo()
}

function iniciarJogo(){
    contador = 0;

    jogador1 = inputs[0].value;
    jogador2 = inputs[2].value;
    simbolo1 = inputs[1].value;
    simbolo2 = inputs[3].value;

    for(let casa of casas){
        casa.onclick = clicar;
        casa.innerHTML = "";
    }

    tabuleiro.style.display = "block";
    sectioInputs.style.display = "none";
}

function verificar(){
    if(comparar(casas[0], casas[1], casas[2]) ||
    comparar(casas[3], casas[4], casas[5]) ||
    comparar(casas[6], casas[7], casas[8]) ||
    comparar(casas[0], casas[3], casas[6]) ||
    comparar(casas[0], casas[4], casas[7]) ||
    comparar(casas[2], casas[5], casas[8]) ||
    comparar(casas[0], casas[4], casas[8]) ||
    comparar(casas[2], casas[4], casas[6])){
        for(let casa of casas){
            casa.onclick = null;
        }
        if(contador % 2){
            document.querySelector("#vencedor").innerHTML = jogador1;
            vitorias1++;
        }
        else{
            document.querySelector("#vencedor").innerHTML = jogador2;
            vitorias2++;
        }
        document.querySelector("#placar1").innerHTML = `${jogador1} : ${vitorias1}`;
        document.querySelector("#placar2").innerHTML = `${jogador2} : ${vitorias2}`;
        modal.classList.add("descendo");
    }
    else if(contador === 9){
        document.querySelector("#vencedor").innerHTML = "### A VELHA ###!";
        document.querySelector("#placar1").innerHTML = `${jogador1} : ${vitorias1}`;
        document.querySelector("#placar2").innerHTML = `${jogador2} : ${vitorias2}`;
        modal.classList.add("descendo");
    }
}

function comparar(casa1, casa2, casa3){
    if(casa1.innerHTML === casa2.innerHTML &&
       casa2.innerHTML === casa3.innerHTML &&
       casa1.innerHTML !== ""){
        return true;
    }
    return false;
}

function clicar(){
    contador++;

    if(contador % 2){
        this.innerHTML = simbolo1;
        this.estyle.color = "blue";
    }
    else{
        this.innerHTML = simbolo2;
        this.estyle.color = "green";
    }
    
    this.onclick = null;

    if(contador >= 5){
        verificar();
    }
}