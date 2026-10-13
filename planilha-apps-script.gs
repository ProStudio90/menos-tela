// OPCIONAL — grava cada acesso numa planilha Google (com data e hora).
// Como usar: veja "COMO PUBLICAR.md", passo "Planilha (opcional)".
function doPost(e) {
  var dados = JSON.parse(e.postData.contents);
  var aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (aba.getLastRow() === 0) aba.appendRow(["data_hora", "cidade", "etapa"]);
  aba.appendRow([new Date(), String(dados.cidade).slice(0, 40), String(dados.etapa).slice(0, 40)]);
  return ContentService.createTextOutput("ok");
}
