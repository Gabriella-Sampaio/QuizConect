let perguntaAtual = 0;
const container = document.getElementById('container-perguntas');

function irParaQuiz() {
    document.getElementById('tela-inicio').classList.remove('ativa');
    document.getElementById('tela-quiz').classList.add('ativa');
    renderizarPergunta(0);
    atualizarBotoes();
}

// Renderizar uma pergunta
function renderizarPergunta(indice) {
    if (indice >= perguntas.length) return;
    
    const p = perguntas[indice];
    let html = `
        <div class="pergunta ativa" id="pergunta-${indice}">
            <h2>${p.titulo}</h2>
            <p class="dica">${p.dica}</p>
            <div class="opcoes">
    `;
    
    p.opcoes.forEach((op, i) => {
        html += `
            <label class="card-opcao" onclick="selecionarOpcao(this, '${p.id}', '${op.valor}')">
                <input type="radio" name="${p.id}" value="${op.valor}">
                <span class="icone">${op.icone}</span>
                <div class="texto-opcao">
                    <strong>${op.texto}</strong>
                </div>
            </label>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Selecionar uma opção
function selecionarOpcao(card, perguntaId, valor) {
    // Remover seleção anterior
    card.parentElement.querySelectorAll('.card-opcao').forEach(c => c.classList.remove('selecionado'));
    
    // Selecionar este
    card.classList.add('selecionado');
    card.querySelector('input[type="radio"]').checked = true;
}

// Próxima pergunta
function proximaPergunta() {
    // Validar seleção
    const cards = container.querySelectorAll('.card-opcao');
    const selecionado = Array.from(cards).some(c => c.classList.contains('selecionado'));
    
    if (!selecionado) {
        alert('Selecione uma opção antes de continuar!');
        return;
    }
    
    // Salvar resposta
    const inputSelecionado = container.querySelector('input[type="radio"]:checked');
    if (inputSelecionado) {
        adicionarPontos(perguntas[perguntaAtual].id, inputSelecionado.value);
    }
    
    // Próxima
    perguntaAtual++;
    
    if (perguntaAtual >= perguntas.length) {
        calcularResultado();
        return;
    }
    
    renderizarPergunta(perguntaAtual);
    atualizarBotoes();
    atualizarProgresso();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Voltar pergunta
function voltarPergunta() {
    if (perguntaAtual <= 0) return;
    
    // Remover pontos da resposta anterior
    const perguntaAnterior = perguntas[perguntaAtual - 1];
    if (respostas[perguntaAnterior.id]) {
        pontuacao -= respostas[perguntaAnterior.id].peso;
        delete respostas[perguntaAnterior.id];
    }
    
    perguntaAtual--;
    renderizarPergunta(perguntaAtual);
    atualizarBotoes();
    atualizarProgresso();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atualizar botões
function atualizarBotoes() {
    const btnVoltar = document.getElementById('btn-voltar');
    const btnProximo = document.getElementById('btn-proximo');
    const btnDescobrir = document.getElementById('btn-descobrir');
    
    btnVoltar.style.display = perguntaAtual > 0 ? 'inline-block' : 'none';
    
    if (perguntaAtual >= perguntas.length - 1) {
        btnProximo.style.display = 'none';
        btnDescobrir.style.display = 'inline-block';
    } else {
        btnProximo.style.display = 'inline-block';
        btnDescobrir.style.display = 'none';
    }
}

// Atualizar barra de progresso
function atualizarProgresso() {
    const porcentagem = (perguntaAtual / perguntas.length) * 100;
    document.getElementById('barra').style.width = porcentagem + '%';
    document.getElementById('texto-progresso').textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
}

// Calcular e mostrar resultado
function calcularResultado() {
    // Salvar última resposta
    const inputSelecionado = container.querySelector('input[type="radio"]:checked');
    if (inputSelecionado) {
        adicionarPontos(perguntas[perguntaAtual].id, inputSelecionado.value);
    }
    
    const plano = determinarPlano();
    const textoPersonalizado = gerarTextoPersonalizado(plano);
    const grafico = gerarGraficoPerfil();
    
    // Montar tela de resultado
    let graficoHTML = '<div class="grafico-perfil">';
    grafico.forEach(cat => {
        graficoHTML += `
            <div class="barra-categoria">
                <span class="nome-categoria">${cat.nome}</span>
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width:${cat.valor}%; background:${plano.cor}"></div>
                </div>
                <span class="valor-categoria">${cat.valor}%</span>
            </div>
        `;
    });
    graficoHTML += '</div>';
    
    const resultadoHTML = `
        <div class="resultado-header" style="background: ${plano.cor}">
            <h2>Seu Plano Ideal</h2>
            <p class="perfil-detectado">Perfil identificado: <strong>${plano.perfil}</strong></p>
        </div>
        
        <div class="resultado-body">
            <div class="velocidade" style="color: ${plano.cor}">${plano.velocidade}</div>
            <h3>${plano.nome}</h3>
            <div class="preco">${plano.preco}<small>/mês</small></div>
            
            <p class="texto-personalizado">${textoPersonalizado}</p>
            <p class="descricao">${plano.descricao}</p>
            
            ${graficoHTML}
            
            ${plano.mesh ? `
                <div class="alerta-mesh">
                    💡 <strong>Recomendação especial:</strong> Sua residência se beneficia do <strong>Kit Wi-Fi Mesh</strong> para cobertura total em todos os cômodos!
                </div>
            ` : ''}
            
            <a href="https://api.whatsapp.com/send?phone=551334211999&text=Ol%C3%A1!%20Vim%20do%20site!" 
               class="btn-whatsapp" target="_blank" style="background: ${plano.cor}">
                💬 Quero contratar este plano!
            </a>
            
            <p class="info-contato">
            <br><br>
                <img src="assets/img/logo-etec.png" alt="Etec Telecom" class="logo">
                📞 (13) 3421-1999 ✉ contato@eteccnet.com.br<br>
                📍 R. Dair Borges, 41 - Boqueirão, Praia Grande - SP, 11701-210<br>
                🕑Segunda a Sexta: 9:00 às 18:00, Sábado: 9:00 às 13:00
                
            </p>
        </div>
    `;
    
    document.getElementById('resultado-conteudo').innerHTML = resultadoHTML;
    document.getElementById('tela-quiz').classList.remove('ativa');
    document.getElementById('tela-resultado').classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Refazer quiz
function refazerQuiz() {
    pontuacao = 0;
    respostas = {};
    perguntaAtual = 0;
    
    document.getElementById('tela-resultado').classList.remove('ativa');
    document.getElementById('tela-inicio').classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}