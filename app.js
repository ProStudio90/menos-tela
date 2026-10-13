// Identifica a cidade pelo QR code (?c=codigo) e registra o acesso de forma anônima.
(function () {
  var cfg = window.PANFLETO_CONFIG || { cidades: {} };
  var API = "https://abacus.jasoncameron.dev";
  // Acessos feitos no computador de teste (localhost) vão para um contador separado.
  var local = /^(localhost|127\.0\.0\.1|)$/.test(location.hostname);
  var ns = cfg.contador + (local ? "-teste" : "");

  function lerCidade() {
    var c = new URLSearchParams(location.search).get("c");
    if (c && cfg.cidades[c]) {
      try { sessionStorage.setItem("cidade", c); } catch (e) {}
      return c;
    }
    try { var s = sessionStorage.getItem("cidade"); if (s && cfg.cidades[s]) return s; } catch (e) {}
    return "sem-qr"; // acesso direto pelo link, sem passar por um QR code
  }

  var cidade = lerCidade();
  window.PANFLETO_CIDADE = cidade;

  // Mantém a cidade nos links internos (página 1 → página 2).
  document.querySelectorAll("a[data-keep-city]").forEach(function (a) {
    if (cidade !== "sem-qr") a.href = a.getAttribute("href").split("?")[0] + "?c=" + cidade;
  });

  // Conta cada etapa uma vez por visita (recarregar a página não conta de novo).
  window.registrar = function (etapa) {
    var chave = cidade + "_" + etapa;
    try {
      if (sessionStorage.getItem("contou:" + chave)) return;
      sessionStorage.setItem("contou:" + chave, "1");
    } catch (e) {}
    if (cfg.contador) {
      fetch(API + "/hit/" + encodeURIComponent(ns) + "/" + encodeURIComponent(chave), { keepalive: true }).catch(function () {});
    }
    if (cfg.planilha && !local) {
      fetch(cfg.planilha, {
        method: "POST", mode: "no-cors", keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ cidade: cidade, etapa: etapa })
      }).catch(function () {});
    }
  };

  var etapa = document.body.getAttribute("data-etapa");
  if (etapa) window.registrar(etapa);
})();
