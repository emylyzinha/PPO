//CONSTANTES
const tempoTotal = 75

//VARIÁVEIS
let tempo = 75
let minutos = 15
let texto = ''
let quantVezes = 0
let tempoRestante = 0

//CRIA CLASSE 'Redação'
//FUNÇÃO VALIDA SE DADOS != DE VAZIO/NULL/UNDEFINED
class Redacao {

    constructor(redacao){
        this.redacao = redacao
    }

    validarDados(){
        for (let i in this){
            //console.log(i, this[i])
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
            return true
        }
    }
}

//CRIA CLASSE 'Rascunho'
//FUNÇÃO VALIDA SE DADOS != DE VAZIO/NULL/UNDEFINED
class Rascunho {

    constructor(rascunho){
        this.rascunho = rascunho
    }

    validarDados(){
        for (let i in this){
            //console.log(i, this[i])
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
            return true
        }
    }
}

//CRIA CLASSE 'Ideia'
//FUNÇÃO VALIDA SE DADOS != DE VAZIO/NULL/UNDEFINED
class Ideia {

    constructor(ideia){
        this.ideia = ideia
    }

    validarDados(){
        for (let i in this){
            //console.log(i, this[i])
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
            return true
        }
    }
}

//CRIA CLASSE 'BD', SE REFERE AO LOCAL STORAGE
//FUNÇÃO VALIDA SE DADOS != DE VAZIO/NULL/UNDEFINED
class BD {

    //CONSTROI ESPAÇO NO LOCAL STORAGE
    // COLUNA 'id' E '0' (SERIA O VALOR DO ID)
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    //FUNÇÃO PARA PEGAR O PRÓXIMO 'id', OU SEJA, id++
    getProximoId(){
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }

    //FUNÇÃO GRAVAR IDEIA GERADA 
    gravar(_ideia, id){
        id = this.getProximoId()

        //'id': IDENTIFICA O QUE VAI SER ARMAZENADO
        //'_ideia': DADO QUE SERÁ ARMAZENADO EM JSON
        //JSON.stringify TRADUZ O OBJ LITERAL PARA JSON
        localStorage.setItem(id, JSON.stringify(_ideia)) 
        localStorage.setItem('id', id)
    }
    
    //FUNÇÃO RECUPERAR REGISTROS DE IDEIAS
    recuperarTodosRegistros(){

        //CRIA ARRAY DE IDEIAS
        let ideias = Array()

        //RECUPERA ID LOCAL STORAGE EM VARIAVEL 'id'
        let id = localStorage.getItem('id')

        //RECUPERA AS IDEIAS DO LOCALSTORAGE
        //JSON.parse TRADUZ O JSON PARA OBJ LITERAL
        for (let i = 1; i <= id; i++){
            let ideia = JSON.parse(localStorage.getItem(i))
            
            // EM CASO DE INDÍCES REMOVIDOS OU PULADOS: PULAR ÍNDICES
            if(ideia === null){
                continue
            }
            ideia.id = i
            //MÉTODO push ADD VALORES EM UM ARRAY
            ideias.push(ideia)
        }
        return ideias
    }

    //FUNÇÃO REMOVER UMA IDEIA DO LOCALSTORAGE
    remover(id){
        localStorage.removeItem(id)
    }

    //FUNÇÃO REMOVER TODAS AS IDEIAS DO LOCALSTORAGE
    removerTudo(){
        localStorage.clear()
    }
}
let bd = new BD()

//CRIA CLASSE 'Devolutivas'
class Devolutivas {
    constructor(devolutivaLeituraTema, devolutivaCriarIdeias, devolutivaEscreverRascunho, devolutivaEscreverRedacao, tempoTotal, tempoRestante){
        this.devolutivaLeituraTema = devolutivaLeituraTema
        this.devolutivaCriarIdeias = devolutivaCriarIdeias
        this.devolutivaEscreverRascunho = devolutivaEscreverRascunho
        this.devolutivaEscreverRedacao = devolutivaEscreverRedacao
        this.tempoTotal = tempoTotal
        this.tempoRestante =tempoRestante
    }

}
let devolutivas = new Devolutivas()



//FUNÇÃO TEMPO GASTO PARA LER TEMA
function tempoLerTema(){
    let tempoLerTema = tempoTotal - tempo
    console.log('tempo ler tema no tempoTema: ' + tempoLerTema)
    return tempoLerTema
}
//FUNÇÃO TEMPO GASTO PARA CRIAR IDEIAS
function tempoIdeias(){
    let tempoCriarIdeias = tempoRestante - tempo
    console.log('tempo ler tema no tempoIdeias: ' + tempoCriarIdeias)
    return tempoCriarIdeias
}
//FUNÇÃO TEMPO GASTO PARA ESCREVER RASCUNHO 
function tempoRascunho(){
    let tempoFazerRascunho = tempoRestante - tempo
    console.log('tempo tempoRascunho é ' +tempoFazerRascunho)
    return tempoFazerRascunho
}
//FUNÇÃO TEMPO GASTO PARA ESCREVER A REDAÇÃO
function tempoRedacao(){
    let tempoFazerRedacao = tempoRestante - tempo
    console.log('tempoRedacao é ' +tempoFazerRedacao)
    return tempoFazerRedacao
}


//FUNÇÃO CARREGAR IDEIAS INSERIDAS NO LOCALSTORAGE
function carregaIdeias(ideias = Array(), filtro = false){

    //SE ARRAY 'ideias' == 0: GUARDA TODOS OS REGISTROS DO LOCALSTORAGE NO ARRAY 'ideias'
    if (ideias.length == 0 && filtro == false){
        ideias = bd.recuperarTodosRegistros()
    }

    //SELECIONA O TBODY DA TABELA ONDE FICARÃO AS IDEIAS
    let listaIdeias = document.getElementById('listaIdeias')
    listaIdeias.innerHTML = ''

    //PERCORRE ARRAY 'ideias' QUE TEM TODOS OS REGISTROS DO LOCALSTORAGE
    //'_ideia' É UM OBJ: EM CASO DE CONSOLE.LOG() APARECE [object Object]
    ideias.forEach(function(_ideia){

        //CRIA AS LINHAS TR DA TABELA E INSERE IDEIA
        let linha = listaIdeias.insertRow()
        linha.insertCell(0).innerHTML = _ideia.ideia

        //CRIA BOTÃO EXCLUIR IDEIA
        let btn = document.createElement('button')
        btn.className = 'btn btn-outline-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_ideia_${_ideia.id}`

        //FUNÇÃO REMOVER IDEIA QUANDO CLICAR NO BOTÃO
        btn.onclick = function(){
            //SELECIONA
            let id = this.id.replace('id_ideia_', '')
            //REMOVE DO 'BD' OU LOCALSTORAGE
            bd.remover(id)
            //CARREGA IDEIAS NOVAMENTE
            carregaIdeias()
        }

        //O MÉTODO 'append' ADICIONA UM NOVO VALOR DENTRO DE UMA CHAVE EXISTENTE DENTRO DO OBJETO 
        linha.insertCell(1).append(btn)

        //VERIFICA SE PODE LIBERAR BOTÃO PARA IR FAZER RASCUNHO 'irideias()'
        if (ideias.length < 3){
            document.getElementById('proximoIdeia').className = 'btn btn-danger mt-4 col-3 mb-4 align-self-center disabled'
        }
        irIdeias()
    })
    
    //VERIFICA SE TEM PELO MENIOS 3 IDEIAS PARA HABILITA BOTÃO PARA IR FAZER RASCUNHO 'irideias()'
    if (ideias.length > 2){
        document.getElementById('proximoIdeia').className = 'btn btn-danger mt-4 col-3 mb-4 align-self-center'
    }

    //VERIFICA SE TEM 5 IDEIAS, CASO VERDADEIRO, DESABILITA BOTÃO ADD IDEIAS
    if (ideias.length == 5){
        document.getElementById('addIdeia').className = 'btn btn-danger btn-lg align-self-end ml-2 disabled'
    }

    //LIMPA TEXTAREA PARA ESCREVER IDEIAS
    document.getElementById("digiteIdeia").value = ''

}

//FUNÇÃO PARA CRONOMETRO
var cronometro = setInterval(function  iniciarContagem(){
    tempo -= 1

    //FINALIZAR REDAÇÃO CASO O TEMPO ACABE
    if (tempo < 0){
        clearInterval(cronometro)
        finalizarRedacao()
    }
    // SE TEMPO < 10 ADICIONA 0 PARA FICAR BUNITINHO
    else if (tempo < 10){
        document.getElementById('cronometro').innerHTML = '<b>00:0'+tempo+'</b>'
    }
    //SE TEMPO >= 60 DIMINUI MINUTOS E HORAS = 0
    else if(tempo >= 60){
        minutos -= 1
        //SE MINUTOS < 10 ADICIONA 0 PARA FICAR BUNITINHO
         if (minutos < 10){
        document.getElementById('cronometro').innerHTML = '<b>01:0'+minutos+'</b>'
        }
        //CASO NÃO, NÃO ADD 0 E FICA BUNITINHO
        else{
            document.getElementById('cronometro').innerHTML = '<b>01:'+minutos+'</b>'
        }
    }
    //ÚTIMA HIPÓTESE: HORAS = 0 E MINUTOS > 10
    else {
        document.getElementById('cronometro').innerHTML = '<b>00:'+tempo+'</b>'
    }

}, 600) //60000

//HABILITA FUNÇÕES: DIGITAR IDEIA E ADD IDEIA
//DESABILITA BOTÃO 'proximoTema'
//CHAMA FUNÇÃO TEMPO GASTO PARA LER TEMA
function irIdeias(){

    //HABILITA
    document.getElementById('digiteIdeia').className = 'form-control form-control-lg mt-4 col-8 offset-1'
    document.getElementById('addIdeia').className = 'btn btn-danger btn-lg align-self-end ml-2'
    //document.getElementById('proximoIdeia').className = 'btn btn-danger mt-4 col-3 mb-4 align-self-center'

    //DESABILITA
    document.getElementById('proximoTema').className = 'btn btn-danger mt-4 col-3 mb-4 align-self-center disabled'

    //CHAMA FUNÇÃO temolerTema()
    if (quantVezes == 0){
        devolutivas.devolutivaLeituraTema = tempoLerTema()
        quantVezes++
        tempoRestante = tempoTotal - devolutivas.devolutivaLeituraTema
        console.log('tempo restante: ' +tempoRestante)
    }
    
}

//FUNÇÃO PARA ADICIONAR IDEIAS 
function addIdeia(ideias = Array()){

    //ADD IDEIA
    let descricaoIdeia = document.getElementById("digiteIdeia")
    let ideia = new Ideia (descricaoIdeia.value)

    //VALIDA DESCRIÇÃO IDEIA NÃO É NULL/VAZIO/UNDEFINED
    if(ideia.validarDados()){
        bd.gravar(ideia)
    }

    //CHAMAM FUNÇÃOP PARA CARREGAR IDEIAS 
    carregaIdeias()
}

//HABILITA FUNÇÕES: ESCREVER RASCUNHO E PROXIMO RASCUNHO
//DESABILITA BOTÃO 'addideia'
//CHAMA FUNÇÃO TEMPO GASTO PARA CRIAR IDEIAS
function irRascunho(){
    
    //HABILITA
    document.getElementById('escreverRascunho').disabled = false
    document.getElementById('proximoRascunho').className = 'btn btn-danger mt-4 col-3 align-self-center mb-4'

    //DESABILITA
    document.getElementById('addIdeia').className = 'btn btn-danger btn-lg align-self-end ml-2 disabled'
    document.getElementById('proximoIdeia').className = 'btn btn-danger mt-4 col-3 mb-4 align-self-center disabled'

    //CHAMA FUNÇÃO TEMPO GASTO PARA CRIAR IDEIAS
    devolutivas.devolutivaCriarIdeias = tempoIdeias()
    tempoRestante = tempoRestante - devolutivas.devolutivaCriarIdeias
    console.log('tempo restante: ' +tempoRestante)
}

//GUARDA TEXTO RASCUNHO EM VARIAVEL '_rascunho'
//VALIDA SE rascunho != VAZIO/NULL/UNDEFINED
//HABILITA FUNÇÕES: ESCREVER REDAÇÃO E FINALIZAR REDAÇÃO
//DESABILITA FUNÇÃO ESCREVER RASCUNHO E BOTÃO 'proximoRascunho' 
//CHAMA FUNÇÃO TEMPO GASTO PARA FAZER RASCUNHO
function irRedacao(){

    let _rascunho = document.getElementById("escreverRascunho").value
    let rascunho = new Rascunho(_rascunho)

    if(rascunho.validarDados()){
        //HABILITA
        document.getElementById('redacaoFinal').disabled = false
        document.getElementById('finalizaRedacao').className = 'btn btn-danger mt-4 col-4 mb-4 align-self-center btn-lg'

        //DESABILITA
        document.getElementById('escreverRascunho').disabled = true
        document.getElementById('proximoRascunho').className = 'btn btn-danger mt-4 col-3 align-self-center mb-4 disabled'
    }
    else {
        
        document.getElementById('modalTituloHabilitaRedacao').innerHTML = 'Não foi feito o rascunho!',
        document.getElementById('modalTituloDivHabilitaRedacao').className = "modal-header text-danger",
        document.getElementById('modalConteudoHabilitaRedacao').className = "text-dark p-2",
        document.getElementById('modalConteudoHabilitaRedacao').innerHTML = 'Faça um rascunho para prosseguir',
        document.getElementById('modalBtnHabilitaRedacao').className = 'btn btn-danger',
        document.getElementById('modalBtnHabilitaRedacao').innerHTML = 'Voltar',

        
        //FUNÇÃO MOSTRAR MODAL ERRO
        $('#modalHabilitaRedacao').modal('show')
    }

    //CHAMA FUNÇÃO TEMPO GASTO PARA ESCREVER RASCUNHO 
    devolutivas.devolutivaEscreverRascunho = tempoRascunho()
    tempoRestante = tempoRestante - devolutivas.devolutivaEscreverRascunho
    console.log('tempo restante:' +tempoRestante)
}

//FUNÇÃO PARA FINALIZAR REDAÇÃO 
//CHAMA FUNÇÃO TEMPO GASTO PARA FAZER A REDAÇÃO FINAL
//VALIDA SE redacao != VAZIO/NULL/UNDEFINED
//APRESENTA DEVOLUTIVA 
//CHAMA FUNÇÃO PARA LIMPAR FORMULÁRIO
function finalizarRedacao(){

    //GUARDA REDAÇÃO FINAL ESCRITA PELO USUARIO
    texto = document.getElementById("redacaoFinal").value
    let redacao = new Redacao(texto)

    //CHAMA FUNÇÃO TEMPO GASTO PARA ESCREVER A REDAÇÃO
    //CALCULA TEMPO RESTANTE 
    devolutivas.devolutivaEscreverRedacao = tempoRedacao()
    devolutivas.tempoRestante = tempoRestante - devolutivas.devolutivaEscreverRedacao
    console.log('o tempo restante: ' +devolutivas.tempoRestante)

    //CALCULA TEMPO TOTAL GASTO
    devolutivas.tempoTotal = devolutivas.devolutivaLeituraTema + devolutivas.devolutivaCriarIdeias + devolutivas.devolutivaEscreverRascunho + devolutivas.devolutivaEscreverRedacao

    if (redacao.validarDados() == false){

        document.getElementById('modalTitulo').innerHTML = 'A redação não foi realizada!',
        document.getElementById('modalTituloDiv').className = "modal-header text-danger",
        document.getElementById('modalConteudo').className = "text-dark p-2",
        document.getElementById('modalConteudo').innerHTML = 'Por favor realize a redação para proseguir.', 
        document.getElementById('modalBtnCopy').remove(),
        document.getElementById('modalBtn').className = 'btn btn-danger',
        document.getElementById('modalBtn').innerHTML = 'Voltar',

        
        //MOSTRA MODAL ERRO NA TELA
        $('#modalDevolutiva').modal('show')

    } else {

        
        limparTudo()

        document.getElementById('modalTitulo').innerHTML = 'A redação foi realizada com sucesso!',
        document.getElementById('modalTituloDiv').className = "modal-header text-success",
        document.getElementById('modalConteudo').className = "text-dark p-2",

        document.getElementById('modalConteudo').innerHTML = '<b>Devolutiva</b><br><hr>Leitura: ' +devolutivas.devolutivaLeituraTema+' minutos<br>Criar ideias: ' +devolutivas.devolutivaCriarIdeias+' minutos<br>Fazer rascunho: ' +devolutivas.devolutivaEscreverRascunho+' minutos<br>Fazer redação: '+devolutivas.devolutivaEscreverRedacao+' minutos<br><br>Tempo total: '+devolutivas.tempoTotal+ ' minutos<br>Tempo restante: ' +devolutivas.tempoRestante+' minutos',

        document.getElementById('modalBtn').className = 'btn btn-success',
        document.getElementById('modalBtn').className = 'btn btn-success',
        document.getElementById('modalBtn').innerHTML = 'Voltar',
    
        //MOSTRA MODAL SUCESSO NA TELA 
        $('#modalDevolutiva').modal('show')
        
    }
}

//FUNÇÃO PARA VOLTAR A PÁGINA INICIAL 'index.html'
function voltarHome(){
    window.open("index.html")
}

//FUNÇÃO LIMPAR 'bd'
function limparTudo(){
    bd.removerTudo()
}

//A REDAÇÃO DO ALUNO ESTÁ GUARDADA NA VARIÁVEL texto DA FUNÇÃO finalizarRedacao()
// NO ENTANTO, PARA INSERIR O texto NA PÁGINA É PRECISO PASSAR texto COMO PARÂMETRO
// A FUNÇÃO carregaSuaRedacao() É CHAMADA PELO ONLOAD NO BODY DA PÁG
function carregaSuaRedacao(){
    console.log('estamos na função braba mano -> não aguento mais :(')

    //inserir tema redacao 
    temaSuaRedacao = document.getElementById('temaRedacaoAluno')
    temaSuaRedacao.textContent = 'Tema: O estigma associado às doenças mentais na sociedade brasileira'

    //inserir texto redacao aluno
    temaSuaRedacao = document.getElementById('textoRedacaoAluno')
    temaSuaRedacao.className = 'card-text text-warning'
    temaSuaRedacao.textContent = 'O hexa vem e o real madrid vai perder para o liverpool ;)'
}

//ADD FUNÇÕES REFERENTE AO TEMA E TEXTOS DE APOIO > ENVOLVE BD
//FAZER FUNÇÃO COPY