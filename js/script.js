// Jogo de simulação de atendimento com feedback educativo

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

  function mostrarResultadoFinal() {
    const desempenho = ((acertos / perguntas.length) * 100).toFixed(0);
    let mensagemFinal = "";

    if (desempenho == 100) {
      mensagemFinal = "🌟 Excelente! Você acertou todas as questões!";
    } else if (desempenho >= 60) {
      mensagemFinal = "👍 Muito bom! Você está acima da média.";
    } else if (desempenho >= 40) {
      mensagemFinal = "🧐 Quase lá! Continue estudando para melhorar.";
    } else {
      mensagemFinal = "💡 Não desanime! Treine mais e logo terá melhores resultados.";
    }

    perguntaEl.innerHTML = `<strong>Resultado final: ${desempenho}% de acerto.</strong>`;
    opcoesEl.innerHTML = `<p style='font-size: 1.2rem;'>${mensagemFinal}</p>`;
    feedbackEl.innerHTML = "<p>Personagem Treinador: <strong>WilliamBot</strong> diz: 'Continue praticando, o sucesso vem com o esforço!'</p>";
  }

  function mostrarPergunta() {
    const atual = perguntas[indice];
    perguntaEl.textContent = atual.pergunta;
    opcoesEl.innerHTML = "";
    feedbackEl.innerHTML = "";

    atual.opcoes.forEach((opcao, i) => {
      const btn = document.createElement("button");
      btn.textContent = opcao;
      btn.style.padding = "0.75rem 1.25rem";
      btn.style.margin = "0.5rem";
      btn.style.borderRadius = "8px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.backgroundColor = "#00509e";
      btn.style.color = "#ffffff";
      btn.style.fontWeight = "500";
      btn.onmouseover = () => btn.style.backgroundColor = "#003366";
      btn.onmouseout = () => btn.style.backgroundColor = "#00509e";

      btn.onclick = () => {
        if (i === atual.correta) {
          btn.style.backgroundColor = "#198754";
          feedbackEl.innerHTML = `<p style=\"color:#198754\"><strong>✅ Correto!</strong> ${atual.complemento}</p>`;
          acertos++;
        } else {
          btn.style.backgroundColor = "#dc3545";
          feedbackEl.innerHTML = `<p style=\"color:#dc3545\"><strong>❌ Incorreto.</strong> ${atual.dica}</p>`;
        }

        document.querySelectorAll("button").forEach(button => button.disabled = true);

        if (indice < perguntas.length - 1) {
          indice++;
          setTimeout(mostrarPergunta, 3000);
        } else {
          setTimeout(mostrarResultadoFinal, 4000);
        }
      };

      opcoesEl.appendChild(btn);
    });
  }

  mostrarPergunta();
});

