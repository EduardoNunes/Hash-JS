const casa = document.querySelectorAll(".casa");
const JOGADOR_X = "X";
const JOGADOR_O = "O";

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let fimDeJogo = false;

document.addEventListener("click", (event) =>{
    if(event.target.matches(".casa")) {
       jogar(event.target.id, JOGADOR_X);
       setTimeout(() => bot(), 500);
    }
});

function armazenar () {
    const jogadas = JSON.stringify()
}

function usarMemoria () {
    const memo = JSON.parse(JsonData);
}

function bot() {
    const posicoesDisponiveis = [];
    for (index in casa){
        if(!isNaN(index)) {
            if(!casa[index].classList.contains("X") && !casa[index].classList.contains("O")) {
                posicoesDisponiveis.push(index);
            }            
        }
    }

    const posicoesAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );
    if(!fimDeJogo) {
        jogar(posicoesDisponiveis[posicoesAleatoria], JOGADOR_O);
    }
}

function jogar(id, turno) {
    const casa = document.getElementById(id);    
    casa.textContent = turno;
    casa.classList.add(turno);    
    checarVencedor(turno);
}

function checarVencedor(turno){
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return casa[index].classList.contains(turno);
        })
    });

    if (vencedor){
        encerrarJogo(turno);
    } else if (checarEmpate()) {
        encerrarJogo();
    }
}

function checarEmpate() {
    let x = 0;
    let o = 0;

    for (index in casa) {
        if(!isNaN(index)) {
            if(casa[index].classList.contains(JOGADOR_X)) {
                x++;
            }

            if(casa[index].classList.contains(JOGADOR_O)) {
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

function  encerrarJogo(vencedor = null) {
    fimDeJogo = true;
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);

    if (vencedor) {
        h2.innerHTML = `O player ' ${vencedor} ' venceu`;
    } else {
        h2.innerHTML = "Empatou";
    }

    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`
    }, 1000);

    setTimeout(() => location.reload(), 4000);
}

