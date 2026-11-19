const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const r=await (await fetch('http://localhost:3100/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'auditoria@example.com',senha:'senha1234'})})).json();
for(const [vp,w,h] of [['mobile',390,844],['desktop',1280,800]]){
const ctx=await b.newContext({viewport:{width:w,height:h}});await ctx.addInitScript(([t,u])=>{localStorage.setItem('token',t);localStorage.setItem('usuario',JSON.stringify(u))},[r.token,r.usuario]);
const p=await ctx.newPage();await p.route(/fonts\./,x=>x.abort());
await p.route('**/api/comunidade',rt=>rt.request().method()==='GET'?rt.fulfill({json:{posts:[]}}):rt.continue());
await p.goto('http://localhost:3100/comunidade.html',{waitUntil:'networkidle'});await p.screenshot({path:`out/depois/comunidade-estado-vazio-${vp}.png`});
const q=await ctx.newPage();await q.route(/fonts\./,x=>x.abort());await q.route('**/api/comunidade',rt=>rt.fulfill({status:500,json:{erro:'Algo deu errado do nosso lado. Tente de novo em instantes.'}}));
await q.goto('http://localhost:3100/comunidade.html',{waitUntil:'networkidle'});await q.screenshot({path:`out/depois/comunidade-estado-erro-${vp}.png`});
const s=await ctx.newPage();await s.route(/fonts\./,x=>x.abort());await s.route('**/api/comunidade',async rt=>{await new Promise(r=>setTimeout(r,4000));rt.fulfill({json:{posts:[]}})});
await s.goto('http://localhost:3100/comunidade.html');await s.waitForTimeout(800);await s.screenshot({path:`out/depois/comunidade-estado-carregando-${vp}.png`});
}
await b.close()})();
