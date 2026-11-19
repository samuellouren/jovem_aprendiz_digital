# Scripts de auditoria da 3ª AV

Para repetir a medição (por exemplo, para gerar o relatório "depois" final no seu computador):

1. `npm i playwright axe-core` numa pasta de ferramentas (fora do projeto) e `npx playwright install chromium`.
2. Suba o sistema (`npm start`) e crie uma conta de teste `auditoria@example.com` / `senha1234` (os scripts `forms.js`, `vazio.js` e `estados.js` usam essa conta; `audit.js` cria uma conta nova a cada rodada).
3. `node audit.js depois http://localhost:3000` gera `out/depois/resultado.json` e capturas.
4. Ajuste a primeira linha dos scripts se o caminho do Playwright for outro e troque `executablePath` pelo seu Chrome (no Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`).
