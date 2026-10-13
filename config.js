// ============================================================
//  CONFIGURAÇÃO DO PANFLETO — é só editar este arquivo
// ============================================================
window.PANFLETO_CONFIG = {
  // Endereço público do site depois de publicado (termine com /).
  // Ex.: "https://seu-usuario.github.io/menos-tela/"
  siteUrl: "https://prostudio90.github.io/menos-tela/",

  // Nome do contador de acessos (serviço gratuito Abacus, sem cadastro).
  // Pode deixar como está. Só troque se quiser zerar tudo e começar do zero.
  contador: "menostela-pi2-uceff-2026",

  // (Opcional) Endereço do Google Apps Script que grava cada acesso numa planilha,
  // com data e hora. Deixe vazio se não for usar. Ver "COMO PUBLICAR.md".
  planilha: "",

  // Uma entrada por cidade: código (vai no QR code, sem acento/espaço) → nome exibido.
  cidades: {
    "sao-joao-do-oeste": "São João do Oeste",
    "itapiranga": "Itapiranga",
    "palmitinho": "Palmitinho"
  }
};
