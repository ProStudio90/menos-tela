# Como publicar o panfleto e ver os acessos por cidade

## Como funciona

```
QR da Cidade 1 → site/?c=cidade-1 ─┐
QR da Cidade 2 → site/?c=cidade-2 ─┼→ Página 1 (panfleto) → Página 2 (saiba mais)
QR da Cidade 3 → site/?c=cidade-3 ─┘
                                            ↓
                                 painel.html: números por cidade
```

- A contagem usa o **Abacus**, um contador gratuito que **não precisa de cadastro**. Ela funciona assim que o site é publicado.
- Cada etapa conta **uma vez por visita**: recarregar a página não soma de novo.
- A contagem é anônima e não usa cookies nem coleta dados pessoais (LGPD).
- Acessos feitos no computador de teste (localhost) vão para um contador separado, de **teste**, e não se misturam com os dados reais.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `config.js` | **O único arquivo que vocês editam:** cidades e endereço do site |
| `index.html` | Página 1: o panfleto |
| `saiba-mais.html` | Página 2: sono, ansiedade, atenção, desafio de 7 dias e onde buscar ajuda |
| `cartazes.html` | Gera um cartaz A4 com o QR de cada cidade |
| `painel.html` | **Painel dos acessos por cidade** (atualiza sozinho e baixa CSV) |
| `planilha-apps-script.gs` | Opcional: grava cada acesso numa planilha Google, com data e hora |

## Passo a passo

### 1. Preencher as cidades
Em `config.js`, troque `cidade-1` e `Cidade 1` pelas cidades reais. O código vai no QR, então use letras minúsculas, sem acento e sem espaço. Exemplo: `"itapiranga": "Itapiranga"`.

### 2. Publicar o site (GitHub Pages — gratuito)
1. Crie uma conta em https://github.com.
2. Clique em **New repository**, dê o nome `menos-tela` e deixe como **Public**.
3. Clique em **Add file → Upload files** e arraste todos os arquivos desta pasta. Depois, **Commit changes**.
4. Vá em **Settings → Pages → Branch: main / (root) → Save**.
5. Em 1 a 2 minutos o site estará em `https://SEU-USUARIO.github.io/menos-tela/`.
6. Em `config.js`, coloque esse endereço em `siteUrl` (com a `/` no final) e suba o arquivo de novo.

### 3. Testar antes de imprimir
- Abra `.../menos-tela/cartazes.html`. O aviso amarelo deve ter sumido.
- Leia cada QR com o celular e abra `.../menos-tela/painel.html`. O acesso deve aparecer na cidade certa.
- **Importante:** os acessos de teste entram na contagem real. Anotem quantos foram, ou façam o seguinte antes da ação: em `config.js`, troquem o `contador` por outro nome (ex.: `menostela-pi2-uceff-2026-v2`). Isso zera tudo.

### 4. Imprimir
Em `cartazes.html`, clique em **Imprimir / salvar PDF**. Sai um cartaz A4 por cidade.

### 5. Depois da ação
Abra `painel.html` e clique em **Baixar CSV**. O arquivo abre no Excel e mostra, para cada cidade:
- quantos abriram o panfleto;
- quantos foram à página 2;
- a continuidade (%).

## Planilha com data e hora (opcional)
O contador dá o **total** por cidade. Para saber também o **dia e o horário** de cada acesso (ex.: sexta x domingo):
1. Crie uma planilha nova no Google Sheets.
2. Clique em **Extensões → Apps Script**, apague o que houver, cole o conteúdo de `planilha-apps-script.gs` e salve.
3. Clique em **Implantar → Nova implantação → tipo: App da Web**. Em "Executar como", escolha **Eu**; em "Quem pode acessar", escolha **Qualquer pessoa**. Depois, **Implantar** e autorize.
4. Copie a URL que termina em `/exec` e cole em `planilha` no `config.js`.

## Cuidados na interpretação (vale citar no relatório)
- A métrica conta **visitas**, não pessoas únicas com certeza. A mesma pessoa em outro aparelho ou navegador conta de novo.
- Quem ler o QR sem internet não é contado.
- Os acessos "Sem QR" (ex.: o link divulgado no grupo da turma) ficam **fora** da análise por cidade.
- O contador é um serviço gratuito de terceiros. Consultem o painel e baixem o CSV logo depois da ação; se usarem a planilha, ela serve de cópia de segurança.
