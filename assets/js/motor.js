// ============================================
// MOTOR DE RECOMENDAÇÃO - A "IA" DO SISTEMA
// ============================================

// Banco de perguntas
const perguntas = [
    {
        id: 'perfil',
        titulo: 'O que você mais faz na internet?',
        dica: 'Escolha a atividade principal do seu dia a dia.',
        opcoes: [
            { valor: 'streaming', texto: 'Assistir filmes e séries', icone: '🎬', peso: 25 },
            { valor: 'trabalho', texto: 'Trabalhar e estudar', icone: '💼', peso: 25 },
            { valor: 'jogos', texto: 'Jogar online', icone: '🎮', peso: 40 },
            { valor: 'redes', texto: 'Redes sociais e WhatsApp', icone: '📱', peso: 10 },
            { valor: 'leve', texto: 'Uso bem leve (e-mails, pesquisas)', icone: '📧', peso: 5 }
        ]
    },
    {
        id: 'pessoas',
        titulo: 'Quantas pessoas dividem a internet com você?',
        dica: 'Inclua todo mundo: família, visitas frequentes. Cada pessoa extra exige mais da sua conexão.',
        opcoes: [
            { valor: '1', texto: 'Só eu', icone: '🧍', peso: 5 },
            { valor: '2', texto: '2 pessoas', icone: '👫', peso: 15 },
            { valor: '3-4', texto: '3 a 4 pessoas', icone: '👨‍👩‍👧', peso: 25 },
            { valor: '5+', texto: '5 pessoas ou mais', icone: '👨‍👩‍👧‍👦', peso: 35 }
        ]
    },
    {
        id: 'dispositivos',
        titulo: 'Quantos aparelhos ficam conectados ao mesmo tempo?',
        dica: 'Celular, TV, notebook, Alexa, câmera, videogame... Tudo junto conta!',
        opcoes: [
            { valor: '1-2', texto: '1 ou 2 aparelhos', icone: '📱💻', peso: 5 },
            { valor: '3-5', texto: '3 a 5 aparelhos', icone: '📱💻📺', peso: 15 },
            { valor: '6+', texto: '6 ou mais (casa conectada)', icone: '🏠', peso: 25 }
        ]
    },
    {
        id: 'qualidade',
        titulo: 'Que tipo de streaming você consome?',
        dica: 'Ver Netflix no celular é bem diferente de assistir em 4K na TV de 55"',
        opcoes: [
            { valor: 'hd', texto: 'Qualidade normal (Full HD)', icone: '📺', peso: 10 },
            { valor: '4k', texto: 'Qualidade máxima (4K)', icone: '✨', peso: 20 },
            { valor: 'multiplas', texto: 'Várias TVs ao mesmo tempo', icone: '📺📺', peso: 30 }
        ]
    },
    {
        id: 'internet_atual',
        titulo: 'E sua internet atual, como está?',
        dica: 'Seja sincero(a). Muita gente paga caro por um plano que não usa — ou sofre com um plano que não aguenta.',
        opcoes: [
            { valor: 'nenhuma', texto: 'Não tenho internet ainda', icone: '🔍', peso: 0 },
            { valor: 'sofrendo', texto: 'Tenho, mas TRAVA direto! 😤', icone: '😤', peso: 20 },
            { valor: 'duvida', texto: 'Funciona, mas será que tô pagando certo?', icone: '🤷', peso: 10 },
            { valor: 'boa', texto: 'É boa, só quero confirmar', icone: '👍', peso: 0 }
        ]
    },
    {
        id: 'moradia',
        titulo: 'Qual o tamanho da sua residência?',
        dica: 'Casa grande ou com quintal precisa de um reforço para o Wi-Fi chegar em todo canto.',
        opcoes: [
            { valor: 'kitnet', texto: 'Kitnet ou apartamento pequeno', icone: '🏢', peso: 0 },
            { valor: 'apto_grande', texto: 'Apartamento grande (3+ quartos)', icone: '🏢', peso: 5 },
            { valor: 'casa', texto: 'Casa', icone: '🏠', peso: 15 },
            { valor: 'casa_grande', texto: 'Casa grande com área externa', icone: '🏡', peso: 25 }
        ]
    },
    {
        id: 'futuro',
        titulo: 'Pensando no futuro, o que você prefere?',
        dica: 'A internet ideal não é a que você precisa hoje. É a que vai te atender bem nos próximos meses.',
        opcoes: [
            { valor: 'basico', texto: 'O básico que funcione', icone: '✅', peso: 0 },
            { valor: 'tranquilo', texto: 'Ficar tranquilo(a) por um bom tempo', icone: '😌', peso: 10 },
            { valor: 'melhor', texto: 'Quero o melhor, sem dor de cabeça', icone: '👑', peso: 30 }
        ]
    },
    {
        id: 'horario',
        titulo: 'Qual horário você mais usa a internet?',
        dica: 'O horário de pico influencia na velocidade disponível na sua região.',
        opcoes: [
            { valor: 'diurno', texto: 'Durante o dia (trabalho/estudo)', icone: '☀️', peso: 5 },
            { valor: 'noturno', texto: 'À noite (streaming, jogos)', icone: '🌙', peso: 15 },
            { valor: 'sempre', texto: 'O dia todo, toda hora', icone: '🕐', peso: 25 }
        ]
    }
];

// Variável global de pontuação
let pontuacao = 0;
let respostas = {};

// Função que processa a pontuação
function adicionarPontos(perguntaId, valorEscolhido) {
    const pergunta = perguntas.find(p => p.id === perguntaId);
    if (!pergunta) return;
    
    const opcao = pergunta.opcoes.find(o => o.valor === valorEscolhido);
    if (!opcao) return;
    
    pontuacao += opcao.peso;
    respostas[perguntaId] = {
        valor: valorEscolhido,
        texto: opcao.texto,
        icone: opcao.icone,
        peso: opcao.peso
    };
}

// Função principal: determinar o plano com base na pontuação
function determinarPlano() {
    let plano;
    
    if (pontuacao <= 50) {
        plano = {
            nome: '🌱 Plano Móvel',
            velocidade: '1 GB',
            preco: 'A partir de R$ 29,90',
            descricao: 'Perfeito para uso individual. Navegação, redes sociais e streaming leve sem travamentos.',
            cor: '#F44336',
            mesh: false,
            perfil: 'Uso Leve e Individual'
        };
    } else if (pontuacao <= 100) {
        plano = {
            nome: '🌿 Plano Intermediário',
            velocidade: '600 Mega',
            preco: 'R$ 109,90',
            descricao: 'Equilíbrio ideal para famílias pequenas. Streaming em Full HD e home office sem preocupações.',
            cor: '#F44336',
            mesh: false,
            perfil: 'Uso Familiar Moderado'
        };
    } else if (pontuacao <= 140) {
        plano = {
            nome: '🌳 Plano Avançado',
            velocidade: '800 Mega',
            preco: 'R$ 129,90',
            descricao: 'Potência para streaming 4K, home office intenso e jogos online com baixa latência.',
            cor: '#F44336',
            mesh: false,
            perfil: 'Usuário Exigente'
        };
    } else if (pontuacao <= 180) {
        plano = {
            nome: '🏆 Plano Premium',
            velocidade: '1 Giga',
            preco: 'R$ 149,90',
            descricao: 'Performance máxima para casas com muitos dispositivos. Streaming 4K, jogos competitivos e trabalho pesado, tudo ao mesmo tempo.',
            cor: '#F44336',
            mesh: true,
            perfil: 'Casa Conectada'
        };
    } else {
        plano = {
            nome: '👑 Plano Premium + Mesh',
            velocidade: '1 Giga + Wi-Fi Mesh',
            preco: 'R$ 209,90',
            descricao: 'O melhor da Etec! Ultra velocidade + Wi-Fi Mesh para cada canto da sua casa. Para quem não aceita internet meia-boca.',
            cor: '#F44336',
            mesh: true,
            perfil: 'Power User - Máximo Desempenho'
        };
    }
    
    return plano;
}

// Função que gera o texto personalizado
function gerarTextoPersonalizado(plano) {
    const atividades = [];
    
    if (respostas['perfil']?.valor === 'jogos') atividades.push('jogos online competitivos');
    if (respostas['perfil']?.valor === 'streaming') atividades.push('streaming de filmes e séries');
    if (respostas['perfil']?.valor === 'trabalho') atividades.push('home office e videoconferências');
    if (respostas['perfil']?.valor === 'redes') atividades.push('redes sociais e WhatsApp');
    if (respostas['perfil']?.valor === 'leve') atividades.push('uso leve de internet');
    
    const qualidade = respostas['qualidade']?.valor === '4k' ? ' em 4K' : '';
    const dispositivos = respostas['dispositivos']?.texto?.toLowerCase() || '';
    const pessoas = respostas['pessoas']?.texto?.toLowerCase() || '';
    
    let personalizacao = `Com base nas suas respostas, identificamos seu perfil como <strong>${plano.perfil}</strong>. `;
    
    if (atividades.length > 0) {
        personalizacao += `Você utiliza a internet principalmente para <strong>${atividades.join(', ')}${qualidade}</strong>. `;
    }
    
    personalizacao += `Com ${pessoas} usando ${dispositivos} simultaneamente, `;
    
    if (respostas['internet_atual']?.valor === 'sofrendo') {
        personalizacao += `entendemos por que sua internet atual não está dando conta. `;
    } else if (respostas['internet_atual']?.valor === 'duvida') {
        personalizacao += `faz sentido você questionar se está no plano certo. `;
    }
    
    personalizacao += `Por isso, recomendamos o <strong>${plano.nome} (${plano.velocidade})</strong>.`;
    
    return personalizacao;
}

// Função que gera o gráfico de perfil (barras simples)
function gerarGraficoPerfil() {
    const categorias = [];
    
    if (respostas['perfil']?.valor === 'jogos') categorias.push({ nome: 'Jogos', valor: 90 });
    if (respostas['perfil']?.valor === 'streaming') categorias.push({ nome: 'Streaming', valor: 80 });
    if (respostas['perfil']?.valor === 'trabalho') categorias.push({ nome: 'Home Office', valor: 75 });
    if (respostas['perfil']?.valor === 'redes') categorias.push({ nome: 'Redes Sociais', valor: 30 });
    if (respostas['perfil']?.valor === 'leve') categorias.push({ nome: 'Uso Leve', valor: 20 });
    
    if (parseInt(respostas['dispositivos']?.valor) >= 6 || respostas['dispositivos']?.valor === '6+') 
        categorias.push({ nome: 'Casa Conectada', valor: 85 });
    if (respostas['moradia']?.valor === 'casa_grande') 
        categorias.push({ nome: 'Cobertura Total', valor: 90 });
    if (respostas['futuro']?.valor === 'melhor') 
        categorias.push({ nome: 'Performance', valor: 95 });
    
    return categorias;
}