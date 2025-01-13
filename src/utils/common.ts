export function getFirstChild(htmlEl:ChildNode|null|undefined){
    if(htmlEl && htmlEl.firstChild){
        return getFirstChild(htmlEl.firstChild);
    }else{
        return htmlEl;
    }
    
}