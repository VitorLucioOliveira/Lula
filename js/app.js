(function () {
  "use strict";
  var C = window.CONTENT;
  var app = document.getElementById("app");
  var fx = document.getElementById("fx");
  var timers = [];
  var locked = false;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fill(t) { return String(t).replace(/\{nome\}/g, C.herName); }
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function dino(size) {
    return '<svg class="dino" width="' + size + '" height="' + size + '" viewBox="0 0 200 200" role="img" aria-label="Dinossauro fofo">' +
      '<path d="M30 130 Q8 140 10 160 Q40 150 60 140Z" fill="#8fd3a5"/>' +
      '<ellipse cx="95" cy="120" rx="58" ry="45" fill="#a8e0b8"/>' +
      '<ellipse cx="95" cy="135" rx="36" ry="28" fill="#e6f7d9"/>' +
      '<rect x="68" y="150" width="20" height="30" rx="9" fill="#8fd3a5"/><rect x="104" y="150" width="20" height="30" rx="9" fill="#8fd3a5"/>' +
      '<circle cx="140" cy="68" r="38" fill="#a8e0b8"/>' +
      '<path d="M96 80 L104 56 L114 76Z M112 46 L124 30 L132 50Z" fill="#ff8fab"/>' +
      '<circle cx="152" cy="62" r="6" fill="#3b2f4a"/><circle cx="154" cy="60" r="2" fill="#fff"/>' +
      '<ellipse cx="156" cy="82" rx="8" ry="5" fill="#ffb3c6"/>' +
      '<path d="M146 76 Q156 86 168 74" stroke="#3b2f4a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="80" cy="105" r="7" fill="#8fd3a5"/><circle cx="108" cy="100" r="5" fill="#8fd3a5"/><circle cx="64" cy="128" r="5" fill="#8fd3a5"/>' +
      '</svg>';
  }

  function show(html, cls) {
    app.className = "app " + (cls || "");
    app.innerHTML = html;
    void app.offsetWidth;            // reinicia a animação de entrada
    app.classList.add("in");
    window.scrollTo(0, 0);
    var h = app.querySelector("h1, h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function burst(n) {
    if (reduceMotion) return;
    var symbols = ["💗", "✨", "🌸", "💖", "⭐"];
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 14 + Math.random() * 20 + "px";
      s.style.animationDuration = 3 + Math.random() * 3 + "s";
      s.style.animationDelay = Math.random() * 1.2 + "s";
      fx.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 7500); })(s);
    }
  }

  /* ---------------- Telas ---------------- */
  function start() {
    clearTimers(); locked = false;
    var i = C.intro;
    show(
      '<section class="card center">' +
        '<span class="badge">' + esc(i.badge) + '</span>' +
        '<div class="hero">' + dino(170) + '</div>' +
        '<h1 class="title">' + esc(i.title) + '</h1>' +
        '<p class="sub">' + esc(i.subtitle) + '</p>' +
        '<button class="btn big pulse" id="go">' + esc(i.button) + '</button>' +
        '<p class="note">' + esc(i.note) + '</p>' +
      '</section>' +
      '<p class="footer">' + esc(i.footer) + '</p>'
    );
    document.getElementById("go").onclick = function () { question(0); };
  }

  function question(idx) {
    clearTimers(); locked = false;
    var total = C.questions.length, q = C.questions[idx];
    var opts = q.a.map(function (t, k) {
      return '<button class="opt" data-k="' + k + '">' + esc(t) + '</button>';
    }).join("");
    show(
      '<section class="card">' +
        '<div class="top"><span class="count">Pergunta ' + (idx + 1) + ' de ' + total + '</span>' +
          (idx > 0 ? '<button class="link" id="back">' + esc(C.backButton) + '</button>' : '') + '</div>' +
        '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + (idx + 1) + '">' +
          '<div class="bar-fill" style="width:' + (idx / total * 100) + '%"></div></div>' +
        '<h2 class="q">' + esc(fill(q.q)) + '</h2>' +
        '<div class="opts">' + opts + '</div>' +
      '</section>'
    );
    requestAnimationFrame(function () {
      var f = app.querySelector(".bar-fill"); if (f) f.style.width = ((idx + 1) / total * 100) + "%";
    });
    app.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () {
        if (locked) return; locked = true;
        b.classList.add("picked");
        later(function () { idx + 1 < total ? question(idx + 1) : suspense(); }, 450);
      };
    });
    var back = document.getElementById("back");
    if (back) back.onclick = function () { question(idx - 1); };
  }

  function suspense() {
    var msgs = C.loadingMessages, n = 0;
    show(
      '<section class="card center">' +
        '<div class="hero spin">' + dino(110) + '</div>' +
        '<h2 class="title small">' + esc(C.loadingTitle) + '</h2>' +
        '<p class="sub" id="lmsg">' + esc(msgs[0]) + '</p>' +
        '<div class="dots" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '</section>'
    );
    (function tick() {
      later(function () {
        n++;
        if (n < msgs.length) { document.getElementById("lmsg").textContent = msgs[n]; tick(); }
        else reveal();
      }, 1300);
    })();
  }

  function reveal() {
    var r = C.reveal;
    show(
      '<section class="card center reveal">' +
        '<h2 class="title">' + esc(r.title) + '</h2>' +
        r.paragraphs.map(function (p, k) {
          return '<p class="sub rise" style="animation-delay:' + (0.6 + k * 1.6) + 's">' + esc(fill(p)) + '</p>';
        }).join("") +
        '<button class="btn big rise" id="see" style="animation-delay:' + (0.6 + r.paragraphs.length * 1.6) + 's">' + esc(r.button) + '</button>' +
      '</section>',
      "dark"
    );
    document.getElementById("see").onclick = letter;
  }

  function letter() {
    var L = C.letter;
    var paras = L.paragraphs.map(function (p, k) {
      return '<p class="rise" style="animation-delay:' + (1.2 + k * 0.9) + 's">' + esc(fill(p)) + '</p>';
    }).join("");
    var delay = 1.2 + L.paragraphs.length * 0.9;
    var btns = C.buttons.map(function (b, k) {
      return '<button class="btn ' + (k ? "ghost" : "") + '" data-k="' + k + '">' + esc(b.label) + '</button>';
    }).join("");
    show(
      '<section class="final">' +
        '<h2 class="title">' + esc(L.pageTitle) + '</h2>' +
        '<figure class="polaroid"><img src="' + esc(C.photoPath) + '" alt="Foto nossa" id="photo">' +
          '<figcaption>' + esc(fill(C.photoCaption)) + '</figcaption></figure>' +
        '<article class="paper">' +
          '<p class="greet rise" style="animation-delay:.8s">' + esc(fill(L.greeting)) + '</p>' + paras +
          '<p class="sign rise" style="animation-delay:' + delay + 's">' + esc(fill(L.signature)) + '</p>' +
        '</article>' +
        '<div class="ask rise" id="ask" style="animation-delay:' + (delay + 1) + 's">' +
          '<p class="askq">' + esc(fill(C.finalQuestion)) + '</p>' +
          '<div class="askbtns">' + btns + '</div>' +
        '</div>' +
      '</section>',
      "light"
    );
    // se a foto não existir, mostra um espaço reservado bonito
    var img = document.getElementById("photo");
    img.onerror = function () {
      var ph = document.createElement("div");
      ph.className = "photo-ph";
      ph.textContent = "📷 coloque a foto em " + C.photoPath;
      img.replaceWith(ph);
    };
    burst(28);
    app.querySelectorAll(".askbtns .btn").forEach(function (b) {
      b.onclick = function () { answer(C.buttons[+b.getAttribute("data-k")]); };
    });
  }

  function answer(choice) {
    var ask = document.getElementById("ask");
    ask.innerHTML = '<p class="reply" tabindex="-1">' + esc(fill(choice.reply)) + '</p>' +
      '<button class="btn ghost" id="again">' + esc(C.restartButton) + '</button>';
    burst(18);
    document.getElementById("again").onclick = start;
    ask.querySelector(".reply").focus({ preventScroll: true });
  }

  start();
})();
