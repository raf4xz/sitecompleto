// Função para mostrar a tela de carregamento
function showLoader() {
  const loadingScreen = document.getElementById('loading');
  loadingScreen.style.display = 'flex'; // Mostrar o loader
}

// Função para esconder o loader quando a página estiver carregada
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading');
  loadingScreen.style.display = 'none'; // Esconder o loader
});

// Capturar todos os links na página e adicionar o evento de clique
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a');

  // Para cada link, adiciona um evento de clique
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      const targetHref = link.href;

      // Prevenir o redirecionamento imediato
      event.preventDefault();

      // Verifica se o link leva para a mesma página ou uma âncora
      if (targetHref === window.location.href || targetHref.includes('#')) {
        window.location.href = targetHref; // Permitir o redirecionamento normal
        return;
      }

      showLoader(); // Mostrar o loader

      // Redirecionar para o link após um pequeno atraso
      setTimeout(() => {
        window.location.href = targetHref;
      }, 500); // Pequeno atraso para exibir o loader
    });
  });
});

const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Botão "próximo" que move o carrossel para a direita
nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 860, behavior: 'smooth' });
});

// Botão "anterior" que move o carrossel para a esquerda
prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -860, behavior: 'smooth' });
});


document.getElementById("contactForm").addEventListener("submit", function (event) {

  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let assunto = document.getElementById("assunto").value;
  let msg = document.getElementById("mensagem").value;

  // Validação para campos vazios
  if (!nome || !email || !assunto || !msg) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Validação do formato do email
  let emailvalido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailvalido.test(email)) {
    alert("Por favor, insira um email válido.");
    return;
  }

});

function disableOptions(questionName) {
  let options = document.getElementsByName(questionName);
  options.forEach(option => {
    if (!option.checked) {
      option.disabled = true;
    }
  });
}

let clickSound = document.getElementById('venceusom');
clickSound.volume = 0.5; // Define o volume em 50%

function resetQuiz() {
  let form = document.getElementById('quiz-form');
  form.reset(); // Reseta o formulário

  // Habilita novamente todas as opções
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.disabled = false; // Habilita todas as opções novamente
  });
}

function submitQuiz() {
  let correctAnswers = {
    q1: "C",
    q2: "B",
    q3: "C",
    q4: "D",
    q5: "B",
    q6: "B",
    q7: "C",
    q8: "A",
    q9: "B",
    q10: "B"

  };

  let form = document.getElementById('quiz-form');
  let score = 0;

  for (let key in correctAnswers) {
    let userAnswers = form.elements[key].value;
    if (userAnswers === correctAnswers[key]) {
      score++;
    }
  }

  function playSound() {
    clickSound.currentTime = 0;  // Reinicia o áudio se já estiver tocando
    clickSound.play();           // Reproduz o som
  }

  let result = document.getElementById('result');
  result.innerHTML = `Você acertou ${score} de 10 perguntas.`;

  // Tocar som se todas as respostas estiverem corretas
  if (score === 10) {
    let successSound = document.getElementById('venceusom');
    successSound.play();
  }
  else {
    let failSound = document.getElementById('perdeusom');
    failSound.play();
  }
  resetQuiz()
}