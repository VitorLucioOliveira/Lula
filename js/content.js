/* =====================================================================
   TODOS OS TEXTOS DO SITE FICAM AQUI. Edite à vontade; a lógica está em app.js.
   Use {nome} dentro de qualquer texto para inserir o nome dela (herName).
   ===================================================================== */
window.CONTENT = {
  // ---- PERSONALIZE ----
  herName: "[NOME DELA]",
  photoPath: "assets/foto.jpg",       // coloque a foto em assets/ e ajuste só este caminho
  photoCaption: "a gente 💗",         // legenda da foto instantânea

  // ---- TELA INICIAL ----
  intro: {
    badge: "QUIZ DO MOMENTO",
    title: "Qual dinossauro combina com a sua personalidade?",
    subtitle: "Responda a 8 perguntinhas e descubra qual criatura pré-histórica representa sua essência. 🦕",
    note: "Só 8 perguntas • leva menos de 2 minutos",
    button: "FAZER O QUIZ",
    footer: "feito com carinho, meteoritos não incluídos ☄️"
  },

  // ---- AS 8 PERGUNTAS (4 alternativas cada; nenhuma altera o resultado) ----
  questions: [
    { q: "Você ganhou um dinossauro de estimação. Qual você escolhe?",
      a: ["🦕 Um braquiossauro gentil e altão", "🦖 Um T-rex pequeno, mas cheio de atitude", "🐤 Um velociraptor filhote, bem curioso", "🐢 Um anquilossauro, o mais fofo e blindado"] },
    { q: "Do nada você acorda no período Jurássico. Qual é o seu plano de sobrevivência?",
      a: ["🏕️ Construir uma cabana e fazer amizade com os herbívoros", "🏃 Correr e torcer pelo melhor", "🧠 Usar o raciocínio e ficar longe do T-rex", "🍖 Procurar comida antes de qualquer outra coisa"] },
    { q: "Qual seria o seu encontro perfeito no Jurássico?",
      a: ["🌅 Ver o pôr do sol em cima de um vulcão (inativo, por favor)", "🍃 Piquenique numa clareira cheia de samambaias", "🥚 Uma caça ao tesouro de ovos de dinossauro", "🌊 Um passeio de canoa por um rio tranquilo"] },
    { q: "Qual característica mais combina com você?",
      a: ["💛 Sou carinhosa e acolhedora", "⚡ Sou cheia de energia", "🔍 Sou curiosa e observadora", "🛡️ Sou forte e tenho personalidade"] },
    { q: "Seu cardápio pré-histórico favorito seria...",
      a: ["🥬 Salada de samambaia com folhas crocantes", "🍓 Frutinhas colhidas na hora", "🍗 Uma coxa de brontossauro gigante (de brincadeira!)", "🍰 Bolo de ovo mesozoico"] },
    { q: "Um meteoro está a caminho. Qual é a sua reação?",
      a: ["😌 Fico em paz e vou ver o céu", "📸 Tiro uma selfie com o meteoro", "🏃‍♀️ Corro, mas com estilo", "🤝 Reúno a turma para um último abraço coletivo"] },
    { q: "Qual seria o som que o seu dinossauro faz?",
      a: ["🔊 ROOOAAAR", "🎶 Um piado doce e agudinho", "🤫 Nenhum, ele é silencioso", "😂 Uma risada esquisita e contagiante"] },
    { q: "Para fechar: o que um fóssil seu diria sobre você daqui a milhões de anos?",
      a: ["✨ “Deixou o mundo mais leve”", "📚 “Sabia de coisas demais”", "🎉 “Foi a alma da festa jurássica”", "🌷 “Era daquelas pessoas raras”"] }
  ],

  // ---- SUSPENSE ANTES DA REVELAÇÃO ----
  loadingTitle: "Analisando suas respostas...",
  loadingMessages: [
    "Consultando paleontólogos 🦴",
    "Cruzando dados do Jurássico 🌋",
    "Escavando o seu resultado ⛏️",
    "Hmm... isso é inesperado 👀"
  ],

  // ---- REVELAÇÃO ----
  reveal: {
    title: "Seu resultado saiu...",
    paragraphs: [
      "Bom... você chegou até aqui esperando descobrir qual dinossauro combina com você, né? 🦖",
      "Mas eu tenho uma pequena confissão: talvez esse quiz nunca tenha sido realmente sobre dinossauros..."
    ],
    button: "Ver o resultado 💌"
  },

  // ---- CARTINHA ----
  letter: {
    pageTitle: "O resultado mais importante de todos ❤️",
    greeting: "Oi, {nome},",
    // Cada item é um parágrafo. Troque os trechos entre [colchetes] pelo que você quiser dizer.
    paragraphs: [
      "Eu queria encontrar uma forma diferente e especial de te dizer algo, e achei que um quiz bobo seria um jeito leve de fazer isso.",
      "[MINHA DECLARAÇÃO]",
      "[MENSAGEM FINAL]"
    ],
    signature: "Com carinho,\n[SEU NOME]"
  },

  // ---- PERGUNTA FINAL E BOTÕES ----
  finalQuestion: "Então... você aceita descobrir o que mais pode acontecer entre nós? ❤️",
  buttons: [
    { label: "SIM ❤️",             reply: "Fiquei muito feliz com a sua resposta. Obrigado por ter entrado no meu quiz e por ter lido até aqui. 🥹💗" },
    { label: "Quero saber mais 🥹", reply: "Claro! Sem pressa nenhuma. Quando você quiser, a gente conversa com calma. Obrigado por ter lido até aqui. 💗" }
  ],
  restartButton: "Brincar de novo 🦕",
  backButton: "← Voltar"
};
