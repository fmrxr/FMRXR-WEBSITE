import { NextResponse } from "next/server";
import { currentRoles } from "@/lib/auth";
import fs from "node:fs";

// Sert le HTML de l'OS (auth admin) en injectant le pont de stockage Supabase :
// on remplace, à l'exécution, le stockage fichier (File System Access) par des appels /api/os/graph.
// Le fichier OS source n'est PAS modifié. Chemin surchargeable via env OS_HTML_PATH.

const OS_HTML_PATH = process.env.OS_HTML_PATH || "E:/FMRXR/CLAUDE PRO/FMRXR_OS/FMRXR_OS.html";

// Pont injecté avant </body>. Il réassigne les globales de l'OS (script non-module → scope global partagé).
const BRIDGE = `
<script>
/* ===== FMRXR OS · pont de stockage Supabase (mode web) ===== */
(function(){
  var API='/api/os/graph';
  var _updated=null, _saveTimer=null, _pending=false;
  function ui(state,msg){ try{ syncUI(state,msg); }catch(e){} }

  // 1) chargement depuis Supabase (remplace initPersist / le picker fichier)
  window.initPersist = async function(){
    try{
      var r = await fetch(API,{cache:'no-store'});
      if(r.status===401||r.status===403){ ui('warn','session expirée — reconnecte-toi'); return; }
      if(!r.ok){ ui('warn','Supabase indisponible'); return; }
      var j = await r.json();
      if(j && j.data && j.data.projects){
        DATA = j.data; _updated = j.updated_at || null;
        DATA_SRC='http'; connected=true; lastText=JSON.stringify(DATA);
        rebuild(); ui('on','Supabase · synchronisé'); go(current);
      } else {
        ui('warn','base vide — lance l\\'import (POST /api/os/import)');
      }
    }catch(e){ console.error(e); ui('warn','erreur chargement Supabase'); }
  };

  // plus de sélection de fichier en mode web
  window.connectData = function(){ ui('on','Mode Supabase — données déjà connectées.'); };
  window.loadFromHandle = async function(){ return window.initPersist(); };

  // 2) sauvegarde vers Supabase (verrou optimiste via updated_at)
  window.saveGraph = async function(){
    DATA.meta = DATA.meta || {}; DATA.meta.updated = new Date().toISOString(); DATA.meta.updated_by='OS web';
    try{
      var r = await fetch(API,{method:'PUT',headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ data: DATA, prevUpdated: _updated })});
      if(r.status===409){
        var j = await r.json();
        if(confirm('⚠ Le graphe a été modifié ailleurs depuis ton chargement.\\n\\nOK = écraser avec TA version\\nAnnuler = recharger la version distante (RECOMMANDÉ)')){
          var r2 = await fetch(API,{method:'PUT',headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ data: DATA, force:true })});
          var j2 = await r2.json(); _updated=j2.updated_at; lastText=JSON.stringify(DATA);
          ui('on','sauvegardé (forcé)');
        } else if(j.data){
          DATA=j.data; _updated=j.updated_at; lastText=JSON.stringify(DATA); rebuild(); go(current);
          ui('on','rechargé — version distante');
        }
        return;
      }
      if(!r.ok){ ui('warn','erreur sauvegarde ('+r.status+')'); return; }
      var j3 = await r.json(); _updated=j3.updated_at; lastText=JSON.stringify(DATA);
      ui('on','Supabase · sauvegardé '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}));
    }catch(e){ ui('warn','erreur réseau'); console.error(e); }
  };

  // 3) neutraliser les features du serveur local (verrou fichier, backups, watcher) — inoffensives en web
  window.lockBeat = function(){}; window.loadHealth = function(){
    var el=document.getElementById('health'); if(el) el.innerHTML='<span style="color:var(--acc)">☁ Supabase</span>';
  };
  window.loadInbox = function(){}; window.loadBriefing = function(){};

  // deep-link natif → legacy : /os/legacy#<moduleId> doit ouvrir directement ce module.
  // current/MODULES viennent du script du monolithe — scope global partagé entre balises script classiques.
  function applyHash(){
    var h=(location.hash||'').replace('#','');
    if(h && typeof MODULES!=='undefined' && MODULES.some(function(m){return m.id===h;})) current=h;
  }

  // recharger depuis Supabase (le script OS a déjà appelé l'ancien initPersist en mode fichier)
  function boot(){ applyHash(); window.initPersist(); window.loadHealth(); }
  if(document.readyState!=='loading') setTimeout(boot,60);
  else document.addEventListener('DOMContentLoaded', boot);
})();
</script>
`;

export async function GET() {
  const roles = await currentRoles();
  if (!roles.includes("admin")) return new NextResponse("Forbidden", { status: 403 });

  let html: string;
  try {
    html = fs.readFileSync(OS_HTML_PATH, "utf8");
  } catch (e) {
    return new NextResponse("OS introuvable: " + OS_HTML_PATH + " — " + (e as Error).message, { status: 500 });
  }

  // <script src="store.js"> résout en /os/store.js (404 sous Next.js) : Store reste undefined,
  // le script du monolithe plante à l'appel Store.migrateToV2(...) avant même d'initialiser ses
  // propres variables (ex. `connected`), qui restent alors bloquées en temporal dead zone pour le
  // pont injecté plus bas. On inline store.js à la place du <script src> pour préserver l'ordre
  // d'exécution synchrone sans dépendre d'une route statique séparée.
  const storeJsPath = OS_HTML_PATH.replace(/[^/\\]+$/, "store.js");
  try {
    const storeJs = fs.readFileSync(storeJsPath, "utf8");
    html = html.replace(/<script\s+src=["']store\.js["']\s*>\s*<\/script>/i, `<script>${storeJs}</script>`);
  } catch (e) {
    return new NextResponse("store.js introuvable: " + storeJsPath + " — " + (e as Error).message, { status: 500 });
  }

  // injecter le pont juste avant la fermeture du body
  html = html.replace(/<\/body>\s*<\/html>\s*$/i, BRIDGE + "</body></html>");

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
