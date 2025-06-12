// Configuração da data do evento (28/06/2025 às 13:00)
const eventDate = new Date('2025-06-28T13:00:00');

// Função para atualizar o contador regressivo
function updateCountdown() {
    const now = new Date();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
    }
}

// Função para confirmar presença
function confirmarPresenca() {
    const nome = document.getElementById('nome').value.trim();

    if (nome === "") {
        alert("Por favor, insira seu nome.");
        return;
    }

    // Verifica se o localStorage já possui a lista de nomes
    let nomesConfirmados = JSON.parse(localStorage.getItem('nomesConfirmados')) || [];

    // Verifica se o nome já foi confirmado
    if (nomesConfirmados.includes(nome)) {
        alert("Este nome já foi confirmado!");
        return;
    }

    // Adiciona o nome à lista
    nomesConfirmados.push(nome);

    // Salva a lista de volta ao localStorage
    localStorage.setItem('nomesConfirmados', JSON.stringify(nomesConfirmados));

    alert("Presença confirmada com sucesso! Obrigado, " + nome + "!");
    document.getElementById('nome').value = ""; // Limpa o campo de nome

    // Adiciona confetes para celebrar
    createConfetti();
}

// Função para criar confetes
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#ff0000', '#ffe033', '#ff69b4', '#00ff00', '#0066ff'][Math.floor(Math.random() * 5)];
        document.body.appendChild(confetti);

        // Remove o confete após a animação
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Função para criar balões flutuantes
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.backgroundColor = ['#ff0000', '#ffe033', '#ff69b4'][Math.floor(Math.random() * 3)];
    document.body.appendChild(balloon);

    // Remove o balão após a animação
    setTimeout(() => {
        balloon.remove();
    }, 15000);
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar contador regressivo a cada minuto
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Criar balões ocasionalmente
    setInterval(createBalloon, 8000);

    // Adicionar efeito de neve de confetes ocasional
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de chance a cada 10 segundos
            createConfetti();
        }
    }, 10000);
});

