const estado = {
    proximoId: 0,
    notas: [],

    pegarProximoId: function() {
        this.proximoId++;
        return this.proximoId;
    },

    salvarNotas: function(nota){
        this.notas.push({id: this.pegarProximoId(), nota: nota, situacao: false});
        this.ordenarNotas();
    },

    alterarSituacaoDaNota: function(notaId) {
        for (let nota of this.notas) {
            if (nota.id === notaId) {
                nota.situacao = !nota.situacao;
            }
        }
        this.ordenarNotas();
    },

    ordenarNotas: function() {
        this.notas = this.notas.sort(function (nota2, nota1) {
            if (nota2.situacao && !nota1.situacao) {
                return 1;
            } else if(!nota2.situacao && nota1.situacao) {
                return -1;
            } else {
                return 0;
            }
        });
    },

    excluirNota: function(notaId){
        this.notas = this.notas.filter(function (nota){
            return nota.id !== notaId;
        });
    }
}

function capturarNota(){
    let conteudo = document.getElementById("nota").value;
    if (conteudo !== ''){
        estado.salvarNotas(conteudo);
        renderizar();
        document.getElementById("nota").value = "";
    }
}

function capturarChecked(notaId) {
    estado.alterarSituacaoDaNota(notaId);
    renderizar();
}

function removerNota(notaId){
    estado.excluirNota(notaId);
    renderizar();
}

function renderizar() {
    let novaslinhas = "";
    for(let nota of estado.notas){
        let novaLi = `<li class="item">
        <input onclick="capturarChecked(${nota.id})" id="selecionar" type="checkbox" ${nota.situacao ? 'checked': ""}/>
        <label ${nota.situacao ? 'class="done"': ""}>${nota.nota}</label>
        <button onclick="removerNota(${nota.id})" type="button" class="btn btn-sm btn-danger">Apagar</button>
         </li>`;
        novaslinhas = novaslinhas + novaLi;
    }
    document.getElementById("notas").innerHTML = novaslinhas; 
}

estado.ordenarNotas();
renderizar();

window.onkeypress = function(event) {
    if (event.key === 'Enter') {
        capturarNota();
    } 
};
