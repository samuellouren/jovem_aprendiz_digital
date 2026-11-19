const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const r=await (await fetch('http://localhost:3100/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'auditoria@example.com',senha:'senha1234'})})).json();
const ctx=await b.newContext({viewport:{width:390,height:844}});await ctx.addInitScript(([t,u])=>{localStorage.setItem('token',t);localStorage.setItem('usuario',JSON.stringify(u))},[r.token,r.usuario]);
const p=await ctx.newPage();await p.route(/fonts\./,x=>x.abort());
await p.goto('http://localhost:3100/trilha.html?id=1',{waitUntil:'networkidle'});await p.click('.modulo-no');await p.waitForTimeout(200);
for(let i=0;i<8;i++){const bt=p.locator('#secao-nav .btn-proximo');const t=await bt.textContent();await bt.click();await p.waitForTimeout(150);if(/atividade/i.test(t))break;}
const n=await p.locator('fieldset.questao').count();
for(let i=0;i<n;i++){await p.locator('fieldset.questao').nth(i).locator('label.alternativa').first().click();}
await p.getByRole('button',{name:/verificar/i}).click();await p.waitForTimeout(500);
await p.screenshot({path:'out/depois/sim-base-atividade-mobile.png',fullPage:true});
await p.goto('http://localhost:3100/dashboard.html',{waitUntil:'networkidle'});await p.screenshot({path:'out/depois/sim-base-dashboard-mobile.png',fullPage:true});
await b.close()})();
