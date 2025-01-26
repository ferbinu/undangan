(()=>{var I=(()=>{let s=null,a=null,m=0,i=0,o=!0,d=()=>{m+=1},r=()=>`(${i}/${m}) [${parseInt(i/m*100).toFixed(0)}%]`;return{init:()=>{s=document.getElementById("progress-info"),a=document.getElementById("progress-bar"),s.style.display="block"},add:d,invalid:h=>{o=!1,a.style.backgroundColor="red",s.innerText=`Error loading ${h} ${r()}`},complete:h=>{o&&(i+=1,s.innerText=`Loading ${h} complete ${r()}`,a.style.width=Math.min(i/m*100,100).toString()+"%",i===m&&document.dispatchEvent(new Event("progressDone")))}}})();var V=(()=>{let s=null,a=null,m=!0,i=1e3*60*60*6,o="images",d=async y=>{let n=y.getAttribute("data-src"),f="x-expiration-time";if(s.has(n)){y.src=s.get(n),I.complete("image");return}let x=g=>fetch(n).then(w=>w.blob().then(E=>{let C=new Headers(w.headers);return C.append(f,String(Date.now()+i)),g.put(n,new Response(E,{headers:C})).then(()=>E)}));await caches.open(o).then(g=>g.match(n).then(w=>w?Date.now()<=parseInt(w.headers.get(f))?w.blob():g.delete(n).then(E=>E?x(g):w.blob()):x(g)).then(w=>{y.src=URL.createObjectURL(w),s.set(n,y.src),I.complete("image")})).catch(()=>I.invalid("image"))},r=y=>{y.onerror=()=>I.invalid("image"),y.onload=()=>I.complete("image"),y.complete&&y.naturalWidth!==0&&y.naturalHeight!==0?I.complete("image"):y.complete&&I.invalid("image")},b=()=>m,c=y=>{i=Number(y)},p=()=>{(async()=>{for(let y of a)y.hasAttribute("data-src")?await d(y):r(y)})()};return{init:()=>(s=new Map,a=document.querySelectorAll("img"),a.forEach(I.add),m=Array.from(a).some(y=>y.hasAttribute("data-src")),{load:p,setTtl:c,hasDataSrc:b})}})();var G=(()=>{let s=null,a=null,m=!1,i='<i class="fa-solid fa-circle-pause spin-button"></i>',o='<i class="fa-solid fa-circle-play"></i>',d=async()=>{if(navigator.onLine){s.disabled=!0;try{await a.play(),m=!0,s.disabled=!1,s.innerHTML=i}catch(c){m=!1,alert(c)}}},r=()=>{m=!1,a.pause(),s.innerHTML=o};return{init:()=>{s=document.getElementById("button-music"),a=new Audio(s.getAttribute("data-url")),a.volume=1,a.loop=!0,a.muted=!1,a.currentTime=0,a.autoplay=!1,a.controls=!1,a.addEventListener("canplay",d),s.addEventListener("offline",r),s.addEventListener("click",()=>m?r():d())}}})();var L=(()=>{let s=c=>String(c).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),a=(c,p)=>{let h=null;h=setTimeout(()=>{c(),clearTimeout(h),h=null},p)};return{copy:async(c,p=null,h=1500)=>{let y=c.getAttribute("data-copy");if(!y||y.length==0){alert("Nothing to copy");return}c.disabled=!0;try{await navigator.clipboard.writeText(y)}catch{c.disabled=!1,alert("Failed to copy");return}let n=c.innerHTML;c.innerHTML=p||'<i class="fa-solid fa-check"></i>',a(()=>{c.disabled=!1,c.innerHTML=n},h)},timeOut:a,escapeHtml:s,base64Encode:c=>{let h=new TextEncoder().encode(c);return window.btoa(String.fromCharCode(...h))},base64Decode:c=>{let p=new TextDecoder,h=Uint8Array.from(window.atob(c),y=>y.charCodeAt(0));return p.decode(h)},disableButton:(c,p="Loading")=>{c.disabled=!0;let h=c.innerHTML;return c.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${p}`,{restore:()=>{c.innerHTML=h,c.disabled=!1}}},disableCheckbox:c=>{c.disabled=!0;let p=document.querySelector(`label[for="${c.id}"]`),h=p.innerHTML;return p.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${h}`,{restore:()=>{p.innerHTML=h,c.disabled=!1}}},parseUserAgent:c=>{let p=[{type:"Mobile",regex:/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i},{type:"Tablet",regex:/iPad|Android(?!.*Mobile)/i},{type:"Desktop",regex:/Windows NT|Macintosh|Linux/i}],h=[{name:"Chrome",regex:/Chrome|CriOS/i},{name:"Safari",regex:/Safari/i},{name:"Edge",regex:/Edg|Edge/i},{name:"Firefox",regex:/Firefox|FxiOS/i},{name:"Opera",regex:/Opera|OPR/i},{name:"Internet Explorer",regex:/MSIE|Trident/i}],y=[{name:"Windows",regex:/Windows NT ([\d.]+)/i},{name:"MacOS",regex:/Mac OS X ([\d_]+)/i},{name:"Android",regex:/Android ([\d.]+)/i},{name:"iOS",regex:/OS ([\d_]+) like Mac OS X/i},{name:"Linux",regex:/Linux/i}],n=p.find(E=>E.regex.test(c))?.type||"Unknown",f=h.find(E=>E.regex.test(c))?.name||"Unknown",x=y.find(E=>E.regex.test(c)),g=x&&c.match(x.regex)?.[1]?.replace(/_/g,".")||"",w=x?x.name:"Unknown";return g=g?`${w} ${g}`:w,`${f} ${n} ${g}`}}})();var $=s=>{let a=(r=null)=>{let b=JSON.parse(localStorage.getItem(s));return r?b[String(r)]:b},m=(r,b)=>{let c=a();c[String(r)]=b,localStorage.setItem(s,JSON.stringify(c))},i=r=>Object.keys(a()).includes(String(r)),o=r=>{if(!i(r))return;let b=a();delete b[String(r)],localStorage.setItem(s,JSON.stringify(b))},d=()=>localStorage.setItem(s,"{}");return localStorage.getItem(s)||d(),{set:m,get:a,has:i,clear:d,unset:o}};var N=(()=>{let s={"#000000":"#ffffff","#ffffff":"#000000","#212529":"#f8f9fa","#f8f9fa":"#212529"},a=["#ffffff","#f8f9fa"],m=["#000000","#212529"],i=!1,o=null,d=null,r=()=>o.set("active","light"),b=()=>o.set("active","dark"),c=()=>{r(),document.documentElement.setAttribute("data-bs-theme","light");let g=d.getAttribute("content");d.setAttribute("content",m.some(w=>w===g)?s[g]:g)},p=()=>{b(),document.documentElement.setAttribute("data-bs-theme","dark");let g=d.getAttribute("content");d.setAttribute("content",a.some(w=>w===g)?s[g]:g)},h=(g=null,w=null)=>{let E=o.get("active")==="dark";return g&&w?E?g:w:E};return{init:()=>{switch(o=$("theme"),d=document.querySelector('meta[name="theme-color"]'),o.has("active")||(window.matchMedia("(prefers-color-scheme: dark)").matches?b():r()),document.documentElement.getAttribute("data-bs-theme")){case"dark":b();break;case"light":r();break;default:i=!0}h()?p():c()},spyTop:()=>{let g=E=>{E.filter(C=>C.isIntersecting).forEach(C=>{let u=C.target.classList.contains("bg-white-black")?h(m[0],a[0]):h(m[1],a[1]);d.setAttribute("content",u)})},w=new IntersectionObserver(g,{rootMargin:"0% 0% -95% 0%"});document.querySelectorAll("section").forEach(E=>w.observe(E))},change:()=>h()?c():p(),isDarkMode:h,isAutoMode:()=>i}})();var S=(()=>{let s=(n,f,x)=>({code:n,data:f,error:x}),a=(n=0)=>({love:n}),m=({uuid:n,own:f,name:x,presence:g,comment:w,created_at:E,is_admin:C,ip:u,user_agent:t,comments:T,like:e})=>({uuid:n,own:f,name:x,presence:g,comment:w,created_at:E,is_admin:C??!1,ip:u,user_agent:t,comments:T?.map(m)??[],like:a(e?.love??0)});return{uuidResponse:({uuid:n})=>({uuid:n}),baseResponse:s,tokenResponse:({token:n})=>({token:n}),statusResponse:({status:n})=>({status:n}),commentResponse:({name:n,presence:f,comment:x,is_admin:g,created_at:w})=>({name:n,presence:f,comment:x,is_admin:g,created_at:w}),likeCommentResponse:a,getCommentResponse:m,getCommentsResponse:n=>n.map(m),commentShowMore:(n,f=!1)=>({uuid:n,show:f}),postCommentRequest:(n,f,x,g)=>({id:n,name:f,presence:x,comment:g}),postSessionRequest:(n,f)=>({email:n,password:f}),updateCommentRequest:(n,f)=>({presence:n,comment:f})}})();var U="GET",J="PUT",F="POST",W="PATCH",K="DELETE",D=(s,a)=>{let m=document.body.getAttribute("data-url"),i={method:String(s).toUpperCase(),headers:new Headers({Accept:"application/json","Content-Type":"application/json"})};return m.slice(-1)==="/"&&(m=m.slice(0,-1)),{send(o=null){return fetch(m+a,i).then(d=>d.json().then(r=>{if(d.status>=500&&(r.message??r[0]))throw new Error(r.message??r[0]);if(r.error)throw new Error(r.error[0]);return o&&(r.data=o(r.data)),S.baseResponse(r.code,r.data,r.error)})).catch(d=>{throw alert(d),new Error(d)})},download(){return fetch(m+a,i).then(o=>{if(o.status!==200)return!1;let d=document.querySelector("a[download]");d&&document.body.removeChild(d);let r=o.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1]??"download.csv";return o.blob().then(b=>{let c=document.createElement("a"),p=window.URL.createObjectURL(b);return c.href=p,c.download=r,document.body.appendChild(c),c.click(),document.body.removeChild(c),window.URL.revokeObjectURL(p),!0})}).catch(o=>{throw alert(o),new Error(o)})},token(o){return o.split(".").length===3?(i.headers.append("Authorization","Bearer "+o),this):(i.headers.append("x-access-key",o),this)},body(o){return i.body=JSON.stringify(o),this}}};var A=(()=>{let s=null,a=()=>s.get("token"),m=p=>D(F,"/api/session").body(p).send(S.tokenResponse).then(h=>(h.code===200&&o(h.data.token),h.code===200),()=>!1),i=()=>s.unset("token"),o=p=>s.set("token",p),d=()=>String(a()??".").split(".").length===3;return{init:()=>{s=$("session")},guest:()=>D(U,"/api/config").token(a()).send().then(p=>{if(p.code!==200)return p;let h=$("config");for(let[y,n]of Object.entries(p.data))h.set(y,n);return p}),login:m,logout:i,decode:()=>{if(!d())return null;try{return JSON.parse(window.atob(a().split(".")[1]))}catch{return null}},isAdmin:d,setToken:o,getToken:a}})();var X=(()=>{let s=null,a=!0,m=n=>new Promise(f=>{let x=parseFloat(s.style.opacity),g=null,w=n?.05:-.05,E=n?1:0;g=setInterval(()=>{x=Math.max(0,Math.min(1,x+w)),s.style.opacity=x.toFixed(2),x===E&&(f(),clearInterval(g),g=null)},10)}),i=()=>{let n=null;n=setTimeout(()=>{clearTimeout(n),n=null,a&&r()},3e3)},o=()=>{let n=s.firstElementChild.firstElementChild;n.classList.remove("bg-success"),n.classList.add("bg-danger"),n.firstElementChild.innerHTML='<i class="fa-solid fa-ban me-2"></i>Koneksi tidak tersedia'},d=()=>{let n=s.firstElementChild.firstElementChild;n.classList.remove("bg-danger"),n.classList.add("bg-success"),n.firstElementChild.innerHTML='<i class="fa-solid fa-cloud me-2"></i>Koneksi tersedia kembali'},r=async()=>{await m(!1),o()},b=()=>{let n=["input[data-offline-disabled]","button[data-offline-disabled]","select[data-offline-disabled]","textarea[data-offline-disabled]"].join(", ");document.querySelectorAll(n).forEach(f=>{f.dispatchEvent(new Event(h()?"online":"offline")),f.setAttribute("data-offline-disabled",h()?"false":"true"),f.tagName==="BUTTON"?h()?f.classList.remove("disabled"):f.classList.add("disabled"):h()?f.removeAttribute("disabled"):f.setAttribute("disabled","true")})},c=()=>{a=!1,o(),m(!0),b()},p=()=>{a=!0,d(),i(),b()},h=()=>a;return{init:()=>{window.addEventListener("online",p),window.addEventListener("offline",c),s=document.getElementById("offline-mode"),s.innerHTML=`
        <div class="d-flex justify-content-center mx-auto">
            <div class="d-flex justify-content-center align-items-center rounded-pill my-2 bg-danger shadow">
                <small class="text-center py-1 px-2 mx-1 mt-1 mb-0 text-white" style="font-size: 0.8rem;"></small>
            </div>
        </div>`},isOnline:h}})();var P=(()=>{let s=null,a=null,m=null,i=null,o=null,d=null,r=250,b=()=>`
        <div class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-5 rounded-3 my-1"></span>
                <span class="placeholder bg-secondary col-3 rounded-3 my-1"></span>
            </div>
            <hr class="my-1">
            <p class="placeholder-wave m-0">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3 my-1"></span>
            </p>
        </div>`,c=e=>([["*",'<strong class="text-theme-auto">$1</strong>'],["_",'<em class="text-theme-auto">$1</em>'],["~",'<del class="text-theme-auto">$1</del>'],["```",'<code class="font-monospace text-theme-auto">$1</code>']].forEach(k=>{let v=k[0],H=k[1];e=e.replace(new RegExp(`\\${v}(?=\\S)(.*?)(?<!\\s)\\${v}`,"gs"),H)}),e),p=e=>`
        <button style="font-size: 0.8rem;" onclick="undangan.comment.like.like(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto ms-auto rounded-3 p-0 shadow-sm d-flex justify-content-start align-items-center" data-offline-disabled="false">
            <span class="my-0 mx-1" data-count-like="${e.like.love}">${e.like.love}</span>
            <i class="me-1 ${m.has(e.uuid)?"fa-solid fa-heart text-danger":"fa-regular fa-heart"}"></i>
        </button>`,h=e=>{let l=`<div class="d-flex flex-wrap justify-content-start align-items-center" data-button-action="${e.uuid}">`;return(i.get("can_reply")==!0||i.get("can_reply")===void 0)&&(l+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.reply(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Reply</button>`),a.has(e.uuid)&&(i.get("can_edit")==!0||i.get("can_edit")===void 0)&&(l+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.edit(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Edit</button>`),A.isAdmin()?l+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-own="${e.own}" data-offline-disabled="false">Delete</button>`:a.has(e.uuid)&&(i.get("can_delete")==!0||i.get("can_delete")===void 0)&&(l+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Delete</button>`),l+="</div>",l},y=(e,l)=>{let k=d.get("show").includes(e);return`<a class="text-theme-auto" style="font-size: 0.8rem;" onclick="undangan.comment.showOrHide(this)" data-uuid="${e}" data-uuids="${l.join(",")}" data-show="${k?"true":"false"}" role="button" class="me-auto ms-1 py-0">${k?"Hide replies":`Show replies (${l.length})`}</a>`},n=e=>`
        <div class="d-flex flex-wrap justify-content-between align-items-center" id="button-${e.uuid}">
            ${h(e)}
            ${e.comments.length>0?y(e.uuid,e.comments.map(l=>l.uuid)):""}
            ${p(e)}
        </div>`,f=e=>e.ip===void 0||e.user_agent===void 0||e.is_admin?"":`
        <div class="mb-1 mt-3">
            <p class="text-theme-auto mb-1 mx-0 mt-0 p-0" style="font-size: 0.7rem;" id="ip-${e.uuid}"><i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(e.ip)} ${o.has(e.ip)?`<strong>${o.get(e.ip)}</strong>`:'<span class="mb-1 placeholder col-2 rounded-3"></span>'}</p>
            <p class="text-theme-auto m-0 p-0" style="font-size: 0.7rem;"><i class="fa-solid fa-mobile-screen-button me-1"></i>${L.parseUserAgent(L.escapeHtml(e.user_agent))}</p>
        </div>`,x=(e,l)=>l?'class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4" data-parent="true"':`class="${d.get("hidden").find(k=>k.uuid===e.uuid).show?"":"d-none"} overflow-x-scroll mw-100 border-start bg-theme-auto py-2 ps-2 pe-0 my-2 ms-2 me-0"`,g=(e,l)=>e.is_admin?`<strong class="me-1">${L.escapeHtml(s.get("name")??i.get("name"))}</strong><i class="fa-solid fa-certificate text-primary"></i>`:l?`<strong class="me-1">${L.escapeHtml(e.name)}</strong><i id="badge-${e.uuid}" class="fa-solid ${e.presence?"fa-circle-check text-success":"fa-circle-xmark text-danger"}"></i>`:`<strong>${L.escapeHtml(e.name)}</strong>`,w=(e,l)=>{let k=N.isDarkMode("light","dark"),v=c(L.escapeHtml(e.comment)),H=v.length>r;return`
        <div class="d-flex flex-wrap justify-content-between align-items-center">
            <p class="text-theme-auto text-truncate m-0 p-0" style="font-size: 0.95rem;">${g(e,l)}</p>
            <small class="text-theme-auto m-0 p-0" style="font-size: 0.75rem;">${e.created_at}</small>
        </div>
        <hr class="my-1">
        <p class="text-theme-auto my-1 mx-0 p-0" style="white-space: pre-wrap !important; font-size: 0.95rem;" ${H?`data-comment="${L.base64Encode(v)}"`:""} id="content-${e.uuid}">${H?v.slice(0,r)+"...":v}</p>
        ${H?`<p class="mb-2 mt-0 mx-0 p-0"><a class="text-theme-auto" role="button" style="font-size: 0.85rem; display: block;" data-show="false" onclick="undangan.comment.showMore(this, '${e.uuid}')">Selengkapnya</a></p>`:""}`},E=(e,l)=>`
        <div ${x(e,l)} id="${e.uuid}" style="overflow-wrap: break-word !important;">
            <div id="body-content-${e.uuid}" data-tapTime="0" data-liked="false" tabindex="0">
            ${w(e,l)}
            </div>
            ${f(e)}
            ${n(e)}
            <div id="reply-content-${e.uuid}">${e.comments.map(k=>C(k)).join("")}</div>
        </div>`,C=e=>E(e,!1);return{init:()=>{s=$("user"),a=$("owns"),m=$("likes"),i=$("config"),o=$("tracker"),d=$("comment")},renderEdit:(e,l)=>{let k=document.createElement("div");return k.classList.add("my-2"),k.id=`inner-${e}`,k.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-pen me-2"></i>Edit</label>
        ${document.getElementById(e).getAttribute("data-parent")==="true"&&!A.isAdmin()?`
        <select class="form-select shadow-sm mb-2 rounded-4" id="form-inner-presence-${e}" data-offline-disabled="false">
            <option value="1" ${l?"selected":""}>Datang</option>
            <option value="2" ${l?"":"selected"}>Berhalangan</option>
        </select>`:""}
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type update comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.update(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Update</button>
        </div>`,k},renderReply:e=>{let l=document.createElement("div");return l.classList.add("my-2"),l.id=`inner-${e}`,l.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-reply me-2"></i>Reply</label>
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type reply comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.send(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Send</button>
        </div>`,l},renderLoading:b,renderReadMore:y,renderInnerContent:C,renderContent:e=>E(e,!0),convertMarkdownToHTML:c,maxCommentLength:r}})();var Y=()=>window.confetti.shapeFromPath({path:"M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",matrix:[.03333333333333333,0,0,.03333333333333333,-5.566666666666666,-5.533333333333333]}),Q=()=>{window.confetti({origin:{y:1},zIndex:1057})},Z=(s=15)=>{let a=s*1e3,m=Date.now()+a,i=Y(),o=["#FFC0CB","#FF1493","#C71585"],d=(r,b)=>Math.random()*(b-r)+r;(function r(){let b=m-Date.now();o.forEach(c=>{window.confetti({particleCount:1,startVelocity:0,ticks:Math.max(50,75*(b/a)),origin:{x:Math.random(),y:Math.abs(Math.random()-b/a)},zIndex:1057,colors:[c],shapes:[i],drift:d(-.5,.5),gravity:d(.5,1),scalar:d(.5,1)})}),b>0&&requestAnimationFrame(r)})()},ee=s=>{if(!window.confetti)return;let a=Date.now()+25,m=Math.max(.3,Math.min(1,s.getBoundingClientRect().top/window.innerHeight+.2)),i=Y(),o=["#FF69B4","#FF1493"];(function d(){o.forEach(r=>{window.confetti({particleCount:2,angle:60,spread:55,shapes:[i],origin:{x:0,y:m},zIndex:1057,colors:[r]}),window.confetti({particleCount:2,angle:120,spread:55,shapes:[i],origin:{x:1,y:m},zIndex:1057,colors:[r]})}),Date.now()<a&&requestAnimationFrame(d)})()};var j=(()=>{let s=null,a=async o=>{let d=o.firstElementChild,r=o.lastElementChild,b=o.getAttribute("data-uuid"),c=parseInt(d.getAttribute("data-count-like"));o.disabled=!0,s.has(b)?await D(W,"/api/comment/"+s.get(b)).token(A.getToken()).send(S.statusResponse).then(p=>{p.data.status&&(s.unset(b),r.classList.remove("fa-solid","text-danger"),r.classList.add("fa-regular"),d.setAttribute("data-count-like",String(c-1)))}):await D(F,"/api/comment/"+b).token(A.getToken()).send(S.uuidResponse).then(p=>{p.code==201&&(s.set(b,p.data.uuid),r.classList.remove("fa-regular"),r.classList.add("fa-solid","text-danger"),d.setAttribute("data-count-like",String(c+1)))}),d.innerText=d.getAttribute("data-count-like"),o.disabled=!1};return{init:()=>{s=$("likes")},like:a,tapTap:async o=>{if(!navigator.onLine)return;let d=Date.now(),r=d-parseInt(o.getAttribute("data-tapTime")),b=o.id.replace("body-content-",""),c=r<300&&r>0,p=!s.has(b)&&o.getAttribute("data-liked")!=="true";if(c&&p){navigator.vibrate&&navigator.vibrate(100),ee(o);let h=document.querySelector(`[onclick="undangan.comment.like.like(this)"][data-uuid="${b}"]`);o.setAttribute("data-liked","true"),await a(h),o.setAttribute("data-liked","false")}o.setAttribute("data-tapTime",d)}}})();var O=(()=>{let s=10,a=0,m=0,i=null,o=null,d=null,r=null,b=e=>{s=Number(e)},c=()=>s,p=()=>a,h=()=>m,y=()=>o.classList.contains("disabled")?null:o.classList.add("disabled"),n=()=>o.classList.contains("disabled")?o.classList.remove("disabled"):null,f=()=>d.classList.contains("disabled")?null:d.classList.add("disabled"),x=()=>d.classList.contains("disabled")?d.classList.remove("disabled"):null,g=()=>{r.classList.contains("d-none")&&r.classList.remove("d-none")},w=e=>{e.disabled=!0;let l=e.innerHTML;e.innerHTML='<span class="spinner-border spinner-border-sm my-0 mx-1 p-0" style="height: 0.8rem; width: 0.8rem;"></span>';let k=async()=>{await _.comment(),e.disabled=!1,e.innerHTML=l,_.scroll()};return{next:async()=>{a+=s,e.innerHTML="Next"+e.innerHTML,await k(),i.innerText=String(parseInt(i.innerText)+1)},prev:async()=>{a-=s,e.innerHTML=e.innerHTML+"Prev",await k(),i.innerText=String(parseInt(i.innerText)-1)}}};return{init:()=>{r=document.getElementById("pagination"),r.innerHTML=`
        <ul class="pagination mb-2 shadow-sm rounded-4">
            <li class="page-item disabled" id="previous">
                <button class="page-link rounded-start-4" onclick="undangan.comment.pagination.previous(this)" data-offline-disabled="false">
                    <i class="fa-solid fa-circle-left me-1"></i>Prev
                </button>
            </li>
            <li class="page-item disabled">
                <span class="page-link text-theme-auto" id="page">1</span>
            </li>
            <li class="page-item" id="next">
                <button class="page-link rounded-end-4" onclick="undangan.comment.pagination.next(this)" data-offline-disabled="false">
                    Next<i class="fa-solid fa-circle-right ms-1"></i>
                </button>
            </li>
        </ul>`,i=document.getElementById("page"),o=document.getElementById("previous"),d=document.getElementById("next")},setPer:b,getPer:c,getNext:p,reset:async()=>a===0?!1:(a=0,m=0,i.innerText=1,f(),y(),await _.comment(),!0),setResultData:e=>{if(m=e,a>0&&n(),m<s){f();return}x(),g()},getResultData:h,previous:async e=>{y(),!(a<0)&&(f(),await w(e).prev())},next:async e=>{f(),!(m<s)&&(y(),await w(e).next())}}})();var _=(()=>{let s=null,a=null,m=null,i=null,o=()=>'<div class="text-center p-4 my-2 bg-theme-auto rounded-4 shadow"><p class="fw-bold p-0 m-0" style="font-size: 0.95rem;">Yuk bagikan undangan ini biar banyak komentarnya</p></div>',d=(u,t)=>{document.querySelector(`[data-button-action="${u}"]`).childNodes.forEach(T=>{T.disabled=t})},r=async u=>{if(!confirm("Are you sure?"))return;let t=u.getAttribute("data-uuid");A.isAdmin()&&s.set(t,u.getAttribute("data-own")),d(t,!0);let T=L.disableButton(u),e=document.querySelector(`[onclick="undangan.comment.like.like(this)"][data-uuid="${t}"]`);if(e.disabled=!0,!await D(K,"/api/comment/"+s.get(t)).token(A.getToken()).send(S.statusResponse).then(v=>v.data.status,()=>!1)){T.restore(),e.disabled=!1;return}document.querySelectorAll('a[onclick="undangan.comment.showOrHide(this)"]').forEach(v=>{let H=v.getAttribute("data-uuids").split(",");if(H.find(q=>q===t)){let q=H.filter(B=>B!==t).join(",");q.length===0?v.remove():v.setAttribute("data-uuids",q)}}),s.unset(t),document.getElementById(t).remove();let k=document.getElementById("comments");k.children.length==0&&(k.innerHTML=o())},b=async u=>{let t=u.getAttribute("data-uuid"),T=!1,e=document.getElementById(`form-inner-presence-${t}`);e&&(e.disabled=!0,T=e.value==="1");let l=document.getElementById(`form-${t?`inner-${t}`:"comment"}`),k=!1,v=document.getElementById(`badge-${t}`);if(v&&(k=v.classList.contains("text-success")),t&&L.base64Encode(l.value)===l.getAttribute("data-original")&&k===T){d(t,!1),document.getElementById(`inner-${t}`).remove();return}l.disabled=!0;let H=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);H&&(H.disabled=!0);let q=L.disableButton(u),B=await D(J,"/api/comment/"+s.get(t)).token(A.getToken()).body(S.updateCommentRequest(e?T:null,l.value)).send(S.statusResponse).then(se=>se.data.status,()=>!1);if(l.disabled=!1,H&&(H.disabled=!1),e&&(e.disabled=!1),q.restore(),!B)return;d(t,!1),document.getElementById(`inner-${t}`).remove();let R=document.querySelector(`[onclick="undangan.comment.showMore(this, '${t}')"]`),M=P.convertMarkdownToHTML(L.escapeHtml(l.value)),z=document.getElementById(`content-${t}`);if(M.length>P.maxCommentLength?(z.innerHTML=R?.getAttribute("data-show")==="false"?M.slice(0,P.maxCommentLength)+"...":M,z.setAttribute("data-comment",L.base64Encode(M)),R?.style.display==="none"&&(R.style.display="block")):(z.innerHTML=M,z.removeAttribute("data-comment"),R?.style.display==="block"&&(R.style.display="none")),e&&(document.getElementById("form-presence").value=T?"1":"2",$("information").set("presence",T)),!(!e||!v)){if(T){v.classList.remove("fa-circle-xmark","text-danger"),v.classList.add("fa-circle-check","text-success");return}v.classList.remove("fa-circle-check","text-success"),v.classList.add("fa-circle-xmark","text-danger")}},c=async u=>{let t=u.getAttribute("data-uuid"),T=document.getElementById("form-name"),e=T.value;if(A.isAdmin()&&(e=a.get("name")),e.length==0){t&&T.scrollIntoView({behavior:"smooth"}),alert("Silakan masukkan nama Anda.");return}let l=document.getElementById("form-presence");if(!t&&l&&l.value=="0"){alert("Silakan pilih status kehadiran Anda.");return}!t&&T&&!A.isAdmin()&&(T.disabled=!0),l&&l.value!="0"&&(l.disabled=!0);let k=document.getElementById(`form-${t?`inner-${t}`:"comment"}`);k.disabled=!0;let v=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);v&&(v.disabled=!0);let H=L.disableButton(u),q=l?l.value==="1":!0;if(!A.isAdmin()){let R=$("information");R.set("name",e),t||R.set("presence",q)}let B=await D(F,"/api/comment").token(A.getToken()).body(S.postCommentRequest(t,e,q,k.value)).send(S.getCommentResponse).then(R=>R,()=>null);if(T&&(T.disabled=!1),k.disabled=!1,v&&(v.disabled=!1),l&&(l.disabled=!1),H.restore(),!(!B||B.code!==201)){if(s.set(B.data.uuid,B.data.own),k.value=null,!t){if(await O.reset()){E();return}B.data.is_admin=A.isAdmin();let M=document.getElementById("comments");O.setResultData(M.children.length),O.getResultData()==O.getPer()&&M.lastElementChild.remove(),M.innerHTML=P.renderContent(B.data)+M.innerHTML,E()}if(t){i.set("hidden",i.get("hidden").concat([S.commentShowMore(B.data.uuid,!0)])),i.set("show",i.get("show").concat([t])),d(t,!1),document.getElementById(`inner-${t}`).remove(),B.data.is_admin=A.isAdmin(),document.getElementById(`reply-content-${t}`).insertAdjacentHTML("beforeend",P.renderInnerContent(B.data));let R=document.getElementById(`button-${t}`),M=R.querySelector("a"),z=[B.data.uuid];M&&(M.getAttribute("data-show")==="false"&&f(M),M.remove()),R.querySelector(`button[onclick="undangan.comment.like.like(this)"][data-uuid="${t}"]`).insertAdjacentHTML("beforebegin",P.renderReadMore(t,M?M.getAttribute("data-uuids").split(",").concat(z):z))}g(B.data)}},p=u=>{let t=document.getElementById(`form-inner-${u}`),T=!1,e=document.getElementById(`form-inner-presence-${u}`);e&&(T=e.value==="1");let l=!1,k=document.getElementById(`badge-${u}`);k&&(l=k.classList.contains("text-success")),(t.value.length===0||L.base64Encode(t.value)===t.getAttribute("data-original")&&l===T||confirm("Are you sure?"))&&(d(u,!1),document.getElementById(`inner-${u}`).remove())},h=u=>{let t=u.getAttribute("data-uuid");document.getElementById(`inner-${t}`)||(d(t,!0),document.getElementById(`button-${t}`).insertAdjacentElement("afterend",P.renderReply(t)))},y=async u=>{let t=u.getAttribute("data-uuid");if(document.getElementById(`inner-${t}`))return;d(t,!0);let T=L.disableButton(u);await D(U,"/api/comment/"+t).token(A.getToken()).send(S.commentResponse).then(e=>{if(e.code!==200)return;document.getElementById(`button-${t}`).insertAdjacentElement("afterend",P.renderEdit(t,e.data.presence));let l=document.getElementById(`form-inner-${t}`);l.value=e.data.comment,l.setAttribute("data-original",L.base64Encode(e.data.comment))}),T.restore(),u.disabled=!0},n=()=>{let u=document.getElementById("comments");return u.getAttribute("data-loading")==="false"&&(u.setAttribute("data-loading","true"),u.innerHTML=P.renderLoading().repeat(O.getPer())),D(U,`/api/comment?per=${O.getPer()}&next=${O.getNext()}`).token(A.getToken()).send(S.getCommentsResponse).then(t=>{if(O.setResultData(t.data.length),u.setAttribute("data-loading","false"),t.data.length===0)return u.innerHTML=o(),t;let T=(e,l)=>(e.forEach(k=>{l.find(v=>v.uuid===k.uuid)||l.push(S.commentShowMore(k.uuid)),k.comments&&k.comments.length>0&&T(k.comments,l)}),l);return i.set("hidden",T(t.data,i.get("hidden"))),u.innerHTML=t.data.map(e=>P.renderContent(e)).join(""),t.data.forEach(w),t.data.forEach(g),t})},f=u=>{let t=u.getAttribute("data-uuids").split(","),T=u.getAttribute("data-show")==="true",e=u.getAttribute("data-uuid");T?(u.setAttribute("data-show","false"),u.innerText="Show replies",u.innerText+=" ("+t.length+")",i.set("show",i.get("show").filter(l=>l!==e))):(u.setAttribute("data-show","true"),u.innerText="Hide replies",i.set("show",i.get("show").concat([e])));for(let l of t){i.set("hidden",i.get("hidden").map(v=>(v.uuid===l&&(v.show=!T),v)));let k=document.getElementById(l).classList;T?k.add("d-none"):k.remove("d-none")}},x=(u,t)=>{let T=document.getElementById(`content-${t}`),e=L.base64Decode(T.getAttribute("data-comment")),l=u.getAttribute("data-show")==="false";T.innerHTML=l?e:e.slice(0,P.maxCommentLength)+"...",u.innerText=l?"Sebagian":"Selengkapnya",u.setAttribute("data-show",l?"true":"false")},g=u=>{u.comments&&u.comments.forEach(g);let t=document.getElementById(`body-content-${u.uuid}`);t.addEventListener("touchend",()=>j.tapTap(t))},w=u=>{A.isAdmin()&&(u.comments&&u.comments.forEach(w),!(u.ip===void 0||u.user_agent===void 0||u.is_admin||m.has(u.ip))&&fetch(`https://freeipapi.com/api/json/${u.ip}`).then(t=>t.json()).then(t=>{let T=t.cityName+" - "+t.regionName;t.cityName=="-"&&t.regionName=="-"&&(T="localhost"),m.set(u.ip,T),document.getElementById(`ip-${u.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(u.ip)} <strong>${T}</strong>`}).catch(t=>{document.getElementById(`ip-${u.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(u.ip)} <strong>${L.escapeHtml(t.message)}</strong>`}))},E=()=>document.getElementById("comments").scrollIntoView({behavior:"smooth"});return{like:j,pagination:O,init:()=>{j.init(),P.init(),O.init(),s=$("owns"),a=$("user"),m=$("tracker"),i=$("comment"),i.has("hidden")||i.set("hidden",[]),i.has("show")||i.set("show",[])},scroll:E,cancel:p,send:c,edit:y,reply:h,remove:r,update:b,comment:n,showMore:x,showOrHide:f}})();var te=window.bootstrap;var ne=(()=>{let s=null,a=()=>{let n=document.getElementById("count-down")?.getAttribute("data-time")?.replace(" ","T");if(!n)return;let f=new Date(n).getTime();setInterval(()=>{let x=Math.abs(f-Date.now());document.getElementById("day").innerText=Math.floor(x/(1e3*60*60*24)),document.getElementById("hour").innerText=Math.floor(x%(1e3*60*60*24)/(1e3*60*60)),document.getElementById("minute").innerText=Math.floor(x%(1e3*60*60)/(1e3*60)),document.getElementById("second").innerText=Math.floor(x%(1e3*60)/1e3)},1e3)},m=(n,f=.01)=>{let x=document.getElementById(n),g=parseFloat(x.style.opacity),w=null;w=setInterval(()=>{if(g>0){x.style.opacity=g.toFixed(3),g-=f;return}clearInterval(w),w=null,x.remove()},10)},i=()=>{let n=window.location.search.split("to="),f=null;if(n.length>1&&n[1].length>0&&(f=window.decodeURIComponent(n[1])),f){let g=document.getElementById("guest-name"),w=document.createElement("div");w.classList.add("m-2"),w.innerHTML=`
                <p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${g?.getAttribute("data-message")}</p>
                <h2 class="m-0 p-0">${L.escapeHtml(f)}</h2>
            `,g?.appendChild(w)}let x=document.getElementById("form-name");x&&(x.value=s.get("name")??f),m("loading",.025)},o=n=>{n.disabled=!0,N.isAutoMode()||(document.getElementById("button-theme").style.display="none"),Q(),m("welcome",.025),G.init(),N.spyTop(),L.timeOut(Z,1500)},d=n=>{document.getElementById("show-modal-image").src=n.src,te.Modal.getOrCreateInstance(document.getElementById("modal-image")).show()},r=()=>s.set("info",!0),b=()=>{document.querySelectorAll(".font-arabic").forEach(n=>{n.innerHTML=String(n.innerHTML).normalize("NFC")})},c=()=>{document.querySelectorAll("svg").forEach(n=>{L.timeOut(()=>n.classList.add(n.getAttribute("data-class")),parseInt(n.getAttribute("data-time")))})},p=()=>{c(),a(),b(),s.has("presence")&&(document.getElementById("form-presence").value=s.get("presence")?"1":"2"),s.get("info")&&document.getElementById("information")?.remove()},h=()=>{X.init(),I.init(),s=$("information"),A.isAdmin()&&($("user").clear(),$("owns").clear(),$("likes").clear(),$("session").clear(),$("comment").clear(),$("tracker").clear()),document.addEventListener("progressDone",()=>{document.body.scrollIntoView({behavior:"instant"}),window.AOS.init(),p(),i()});let n=document.body.getAttribute("data-key");if((!n||n.length===0)&&(V.init().load(),document.getElementById("comment")?.remove(),document.querySelector('a.nav-link[href="#comment"]')?.closest("li.nav-item")?.remove()),n.length>0){I.add(),I.add();let f=V.init();f.hasDataSrc()||f.load(),window.addEventListener("load",()=>{let x=new URLSearchParams(window.location.search);A.setToken(x.get("k")??n),A.guest().then(g=>{if(g.code!==200){I.invalid("config");return}I.complete("config"),f.hasDataSrc()&&f.load(),_.init(),_.comment().then(()=>I.complete("comment")).catch(()=>I.invalid("comment"))}).catch(()=>I.invalid("config"))})}};return{init:()=>(N.init(),A.init(),window.addEventListener("DOMContentLoaded",h),{util:L,theme:N,comment:_,guest:{open:o,modal:d,closeInformation:r}})}})();window.undangan=ne.init();})();
