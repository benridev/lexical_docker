import{r as a,a6 as m,a7 as b,m as k}from"./main-DGCghGMi.js";var y=function(e){const r=new URLSearchParams;r.append("code",e);for(let n=1;n<arguments.length;n++)r.append("v",arguments[n]);throw Error(`Minified Lexical error #${e}; visit https://lexical.dev/docs/error?${r} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)};function p(e){const r=e.transform();return r!==null?new Set([r]):new Set}function D({initialEditor:e,children:r,initialNodes:n,initialTheme:g,skipCollabChecks:v}){const u=a.useRef(!1),c=a.useContext(m);c==null&&y(9);const[o,{getTheme:_}]=c,x=a.useMemo(()=>{const l=g||_()||void 0,M=b(c,l);if(l!==void 0&&(e._config.theme=l),e._parentEditor=o,n)for(let t of n){let i=null,s=null;if(typeof t!="function"){const d=t;t=d.replace,i=d.with,s=d.withKlass||null}const h=e._nodes.get(t.getType());e._nodes.set(t.getType(),{exportDOM:h?h.exportDOM:void 0,klass:t,replace:i,replaceWithKlass:s,transforms:p(t)})}else{const t=e._nodes=new Map(o._nodes);for(const[i,s]of t)e._nodes.set(i,{exportDOM:s.exportDOM,klass:s.klass,replace:s.replace,replaceWithKlass:s.replaceWithKlass,transforms:p(s.klass)})}return e._config.namespace=o._config.namespace,e._editable=o._editable,[e,M]},[]),{isCollabActive:w,yjsDocMap:E}=k(),f=v||u.current||E.has(e.getKey());return a.useEffect(()=>{f&&(u.current=!0)},[f]),a.useEffect(()=>o.registerEditableListener(l=>{e.setEditable(l)}),[e,o]),a.createElement(m.Provider,{value:x},!w||f?r:null)}export{D as p};
