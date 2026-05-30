// ======================
// CONFIGURAÇÕES
// ======================

const TOTAL_PONTOS = 20;
const TAXA_MUTACAO = 0.05;

const cores = [
    "red",    // 0
    "blue",   // 1
    "green",  // 2
    "gray"    // 3
];

// Cada ambiente aceita uma cor
const ambientes = [
    { id: "fogo", geneCorreto: 0 },
    { id: "agua", geneCorreto: 1 },
    { id: "terra", geneCorreto: 2 },
    { id: "vento", geneCorreto: 3 }
];

// Populações separadas
let populacoes = {
    fogo: [],
    agua: [],
    terra: [],
    vento: []
};

// ======================
// CRIAR INDIVÍDUO
// ======================

function criarIndividuo() {
    return {
        gene: Math.floor(Math.random() * 4)
    };
}

// ======================
// CRIAR POPULAÇÃO
// ======================

function criarPopulacao() {

    ambientes.forEach(ambiente => {

        populacoes[ambiente.id] = [];

        for(let i = 0; i < TOTAL_PONTOS; i++){

            populacoes[ambiente.id].push(
                criarIndividuo()
            );

        }

    });

}

// ======================
// FITNESS
// ======================

function fitness(individuo, geneCorreto){

    if(individuo.gene === geneCorreto){
        return 100;
    }

    return 0;
}

// ======================
// SELEÇÃO
// ======================

function selecionar(populacao, geneCorreto){

    return populacao.filter(individuo => {

        return fitness(individuo, geneCorreto) === 100;

    });

}

// ======================
// CRUZAMENTO
// ======================

function cruzar(pai, mae){

    return {
        gene:
            Math.random() < 0.5
            ? pai.gene
            : mae.gene
    };

}

// ======================
// MUTAÇÃO
// ======================

function mutacao(individuo){

    if(Math.random() < TAXA_MUTACAO){

        individuo.gene =
            Math.floor(Math.random() * 4);

    }

}

// ======================
// NOVA GERAÇÃO
// ======================

function evoluir(){

    ambientes.forEach(ambiente => {

        let atual =
            populacoes[ambiente.id];

        let sobreviventes =
            selecionar(
                atual,
                ambiente.geneCorreto
            );

        // evita erro caso não sobreviva ninguém

        if(sobreviventes.length === 0){

            sobreviventes.push(
                {
                    gene: ambiente.geneCorreto
                }
            );

        }

        let novaPopulacao = [];

        while(
            novaPopulacao.length < TOTAL_PONTOS
        ){

            let pai =
                sobreviventes[
                    Math.floor(
                        Math.random() *
                        sobreviventes.length
                    )
                ];

            let mae =
                sobreviventes[
                    Math.floor(
                        Math.random() *
                        sobreviventes.length
                    )
                ];

            let filho =
                cruzar(pai, mae);

            mutacao(filho);

            novaPopulacao.push(filho);

        }

        populacoes[ambiente.id] =
            novaPopulacao;

    });

}

// ======================
// DESENHAR
// ======================

function desenhar(){

    document
        .querySelectorAll(".ponto")
        .forEach(p => p.remove());

    ambientes.forEach(ambiente => {

        const div =
            document.getElementById(
                ambiente.id
            );

        populacoes[ambiente.id]
            .forEach(individuo => {

                const ponto =
                    document.createElement(
                        "div"
                    );

                ponto.classList.add(
                    "ponto"
                );

                ponto.style.background =
                    cores[individuo.gene];

                ponto.style.left =
                    Math.random() * 90 + "%";

                ponto.style.top =
                    Math.random() * 80 + "%";

                div.appendChild(ponto);

            });

    });

}

// ======================
// INICIAR
// ======================

criarPopulacao();

desenhar();

setInterval(() => {

    evoluir();

    desenhar();

}, 1000);