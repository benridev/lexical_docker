import{a2 as S,o as P,r as y,m as w,a3 as z,v as _,j as r,R,_ as X,F as B,G as Y,a4 as T,I as W,P as F,J as H,f as x,a5 as C}from"./main-DGCghGMi.js";import{p as I}from"./LexicalNestedComposer.prod-LIkWPcLW.js";const O={...S,paragraph:"StickyEditorTheme__paragraph"};function h(p,a){const u=p.style,d=a.rootElementRect,m=d!==null?d.left:0,c=d!==null?d.top:0;u.top=c+a.y+"px",u.left=m+a.x+"px"}function G({x:p,y:a,nodeKey:u,color:d,caption:m}){const[c]=P(),l=y.useRef(null),f=y.useRef({isDragging:!1,offsetX:0,offsetY:0,rootElementRect:null,x:0,y:0}),{isCollabActive:b}=w();y.useEffect(()=>{const e=f.current;e.x=p,e.y=a;const n=l.current;n!==null&&h(n,e)},[p,a]),z(()=>{const e=f.current,n=new ResizeObserver(s=>{for(let i=0;i<s.length;i++){const g=s[i],{target:D}=g;e.rootElementRect=D.getBoundingClientRect();const v=l.current;v!==null&&h(v,e)}}),t=c.registerRootListener((s,i)=>{i!==null&&n.unobserve(i),s!==null&&n.observe(s)}),o=()=>{const s=c.getRootElement(),i=l.current;s!==null&&i!==null&&(e.rootElementRect=s.getBoundingClientRect(),h(i,e))};return window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o),t()}},[c]),y.useEffect(()=>{const e=l.current;e!==null&&setTimeout(()=>{e.style.setProperty("transition","top 0.3s ease 0s, left 0.3s ease 0s")},500)},[]);const E=e=>{const n=l.current,t=f.current,o=t.rootElementRect,s=R(n);n!==null&&t.isDragging&&o!==null&&(t.x=e.pageX/s-t.offsetX-o.left,t.y=e.pageY/s-t.offsetY-o.top,h(n,t))},k=e=>{const n=l.current,t=f.current;n!==null&&(t.isDragging=!1,n.classList.remove("dragging"),c.update(()=>{const o=x(u);C(o)&&o.setPosition(t.x,t.y)})),document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",k)},j=()=>{c.update(()=>{const e=x(u);C(e)&&e.remove()})},L=()=>{c.update(()=>{const e=x(u);C(e)&&e.toggleColor()})},{historyState:N}=_();return r.jsx("div",{ref:l,className:"sticky-note-container",children:r.jsxs("div",{className:`sticky-note ${d}`,onPointerDown:e=>{const n=l.current;if(n==null||e.button===2||e.target!==n.firstChild)return;const t=n,o=f.current;if(t!==null){const{top:s,left:i}=t.getBoundingClientRect(),g=R(t);o.offsetX=e.clientX/g-i,o.offsetY=e.clientY/g-s,o.isDragging=!0,t.classList.add("dragging"),document.addEventListener("pointermove",E),document.addEventListener("pointerup",k),e.preventDefault()}},children:[r.jsx("button",{onClick:j,className:"delete","aria-label":"Delete sticky note",title:"Delete",children:"X"}),r.jsx("button",{onClick:L,className:"color","aria-label":"Change sticky note color",title:"Color",children:r.jsx("i",{className:"bucket"})}),r.jsxs(I,{initialEditor:m,initialTheme:O,children:[b?r.jsx(X,{id:m.getKey(),providerFactory:B,shouldBootstrap:!0}):r.jsx(Y,{externalHistoryState:N}),r.jsx(T,{contentEditable:r.jsx(W,{className:"StickyNode__contentEditable"}),placeholder:r.jsx(F,{className:"StickyNode__placeholder",children:"What's up?"}),ErrorBoundary:H})]})]})})}export{G as default};
