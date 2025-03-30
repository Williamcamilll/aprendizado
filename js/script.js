document.addEventListener("DOMContentLoaded", () => {
  const perguntas = [
    {
      pergunta: "Cliente: Eu não tenho esse dinheiro agora.",
      opcoes: [
        "Então me liga quando tiver.",
        "Vamos ver uma condição que caiba no seu orçamento hoje?",
        "Você precisa resolver isso agora!"
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
        "Você devia ter tentado mais."
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
        "Não tenho tempo para esperar."
      ],
      correta: 0,
      dica: "Mostre urgência sem pressionar.",
      complemento: "Criar senso de oportunidade ajuda o cliente a decidir mais rápido."
    },
    {
      pergunta: "Cliente: Não tenho como pagar nem metade.",
      opcoes: [
        "Então nem adianta continuar.",
        "Vamos encontrar um valor menor para iniciar hoje?",
        "Você devia ter pago antes."
      ],
      correta: 1,
      dica: "Negocie dentro da realidade financeira do cliente.",
      complemento: "Negociar parcialmente mostra flexibilidade e respeito às limitações do cliente."
    },
    {
      pergunta: "Cliente: Não quero falar sobre isso agora.",
      opcoes: [
        "Sem problemas, posso retornar em um horário melhor.",
        "Você está fugindo do problema.",
        "Isso não é opção, precisamos conversar."
      ],
      correta: 0,
      dica: "Respeitar o espaço do cliente gera abertura futura.",
      complemento: "Agendar novo contato é estratégico e profissional."
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
      btn.onclick = () => {
        if (i === atual.correta) {
          btn.style.backgroundColor = "#d4edda";
          feedbackEl.innerHTML = `<p style="color:green"><strong>✅ Correto!</strong> ${atual.complemento}</p>`;
          acertos++;
        } else {
          btn.style.backgroundColor = "#f8d7da";
          feedbackEl.innerHTML = `<p style="color:red"><strong>❌ Incorreto.</strong> ${atual.dica}</p>`;
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
