document.addEventListener("DOMContentLoaded", () => {
  const perguntas = [
    {
      pergunta: "Cliente: Eu não tenho esse dinheiro agora.",
      opcoes: [
        "Então me liga quando tiver.",
        "Vamos ver uma condição que caiba no seu orçamento hoje?",
        "Você precisa resolver isso agora!",
        "Podemos parcelar em pequenas partes.",
        "Não posso te ajudar."
      ],
      correta: 1,
      dica: "Demonstre empatia e ofereça uma solução viável.",
      complemento: "Oferecer um acordo personalizado mostra compreensão e incentivo ao fechamento."
    },
    {
      pergunta: "Cliente: Já tentei negociar antes e não deu certo.",
      opcoes: [
        "Aqui é diferente, explico tudo direitinho.",
        "Problema seu.",
        "Você devia ter tentado mais.",
        "Esse sistema é novo.",
        "Negociar nem sempre dá certo mesmo."
      ],
      correta: 0,
      dica: "Crie segurança e credibilidade para o cliente.",
      complemento: "Explicar bem e garantir transparência fortalece a confiança."
    },
    {
      pergunta: "Cliente: Quero pensar mais um pouco.",
      opcoes: [
        "Podemos fechar agora com esse desconto exclusivo!",
        "Você pensa demais.",
        "Não tenho tempo para esperar.",
        "Entendo, mas posso garantir essa condição só hoje.",
        "O tempo está passando."
      ],
      correta: 0,
      dica: "Mostre urgência sem pressionar.",
      complemento: "Criar senso de oportunidade ajuda o cliente a decidir mais rápido."
    },
    {
      pergunta: "Cliente: Estou no meio de uma reunião.",
      opcoes: [
        "Entendo, posso agendar um novo contato?",
        "É mais importante que pagar suas dívidas?",
        "Não vou desligar até você me ouvir.",
        "Depois da reunião a gente se fala.",
        "Pode ser amanhã então."
      ],
      correta: 0,
      dica: "Respeito gera abertura futura.",
      complemento: "Mostrar flexibilidade é um diferencial no atendimento."
    },
    {
      pergunta: "Cliente: Não confio mais nesse sistema.",
      opcoes: [
        "Compreendo, posso explicar como funciona e garantir sua segurança.",
        "A culpa não é minha.",
        "Então fique sem pagar.",
        "Talvez o problema tenha sido outro banco.",
        "Não tem outra opção além dessa."
      ],
      correta: 0,
      dica: "Recupere a confiança do cliente com empatia e informação.",
      complemento: "Transparência e paciência são chaves para reconquistar a confiança."
    },
    {
      pergunta: "Cliente: Você está me ligando de novo?",
      opcoes: [
        "Estou sim, porque temos algo importante para resolver.",
        "Você não atende, então tenho que insistir.",
        "É obrigação minha ligar várias vezes.",
        "Faz parte do protocolo de cobrança.",
        "Por favor, escute com atenção dessa vez."
      ],
      correta: 0,
      dica: "Assuma o motivo da ligação com foco na solução.",
      complemento: "Demonstrar propósito evita que o cliente se sinta pressionado."
    },
    {
      pergunta: "Cliente: Estou desempregado no momento.",
      opcoes: [
        "Não posso fazer nada por você.",
        "Posso verificar a menor condição disponível.",
        "Isso não justifica a dívida.",
        "Você devia ter pensado nisso antes.",
        "Não é problema meu."
      ],
      correta: 1,
      dica: "Adapte a abordagem à realidade do cliente.",
      complemento: "Oferecer alternativas demonstra empatia e aumenta a chance de fechar."
    }
  ];

  let indice = 0;
  let acertos = 0;

  const perguntaEl = document.getElementById("pergunta");
  const opcoesEl = document.getElementById("opcoes");
  const feedbackEl = document.getElementById("feedback");
  const quizContainer = document.getElementById("quiz-container");

  // 🎵 Áudios
  const somAcerto = new Audio("audio/acerto.mp3");
  const somErro = new Audio("audio/erro.mp3");

  // 📊 Barra de progresso
  const progresso = document.createElement("div");
  progresso.style.height = "8px";
  progresso.style.background = "#ddd";
  progresso.style.borderRadius = "4px";
  progresso.style.marginBottom = "1rem";
  progresso.innerHTML = `
    <div id="barra-progresso" style="height: 100%; width: 0%; background: #cc092f; border-radius: 4px; transition: width 0.4s;"></div>
  `;
  quizContainer.prepend(progresso);

  function atualizarBarra() {
    const barra = document.getElementById("barra-progresso");
    const perc = ((indice / perguntas.length) * 100).toFixed(0);
    barra.style.width = `${perc}%`;
  }

  function mostrarResultadoFinal() {
    const desempenho = ((acertos / perguntas.length) * 100).toFixed(0);
    let mensagemFinal = "";

    if (desempenho == 100) {
      mensagemFinal = "🌟 Excelente! Você acertou todas!";
    } else if (desempenho >= 60) {
      mensagemFinal = "👍 Muito bom! Você está no caminho certo.";
    } else if (desempenho >= 40) {
      mensagemFinal = "🧐 Quase lá! Treine mais um pouco.";
    } else {
      mensagemFinal = "💡 Não desanime! Praticar leva à perfeição.";
    }

    quizContainer.innerHTML = `
      <h2>✅ Resultado Final</h2>
      <p style="font-size:1.2rem;"><strong>Pontuação:</strong> ${acertos}/${perguntas.length}</p>
      <p style="margin: 1rem 0;">${mensagemFinal}</p>
      <button onclick="location.reload()" style="background:#cc092f;color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:bold;cursor:pointer;">🔁 Jogar novamente</button>
    `;
  }

  function mostrarPergunta() {
    atualizarBarra();

    const atual = perguntas[indice];
    perguntaEl.textContent = atual.pergunta;
    opcoesEl.innerHTML = "";
    feedbackEl.innerHTML = "";

    atual.opcoes.forEach((opcao, i) => {
      const btn = document.createElement("button");
      btn.textContent = opcao;
      btn.className = "opcao";
      btn.style.padding = "0.75rem 1.25rem";
      btn.style.margin = "0.5rem 0";
      btn.style.borderRadius = "8px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.width = "100%";
      btn.style.textAlign = "left";
      btn.style.backgroundColor = "#f0f0f0";
      btn.style.fontSize = "1rem";
      btn.onmouseover = () => (btn.style.backgroundColor = "#e0e0e0");
      btn.onmouseout = () => (btn.style.backgroundColor = "#f0f0f0");

      btn.onclick = () => {
        const botoes = document.querySelectorAll(".opcao");
        botoes.forEach(b => b.disabled = true);

        if (i === atual.correta) {
          somAcerto.play();
          btn.style.backgroundColor = "#198754";
          btn.style.color = "#fff";
          feedbackEl.innerHTML = `✅ <strong>Correto:</strong> ${atual.complemento}`;
          acertos++;
        } else {
          somErro.play();
          btn.style.backgroundColor = "#dc3545";
          btn.style.color = "#fff";
          feedbackEl.innerHTML = `❌ <strong>Incorreto:</strong> ${atual.dica}`;
        }

        if (indice < perguntas.length - 1) {
          indice++;
          setTimeout(mostrarPergunta, 2500);
        } else {
          setTimeout(mostrarResultadoFinal, 3000);
        }
      };

      opcoesEl.appendChild(btn);
    });
  }

  mostrarPergunta();
});
