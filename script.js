const actions=["I build","I make","I design","I develop","I improve"];
const subjects=["embedded systems.","automation tools.","sailing technology.","reliable software.","real-world solutions."];
const verb=document.querySelector("#verb");
const role=document.querySelector("#role");
let actionIndex=0;
let subjectIndex=0;
let nextIsAction=true;
function animateText(element){element.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0)"}],{duration:550,easing:"ease",fill:"both"})}
function changeOneLine(){
  if(nextIsAction){actionIndex=(actionIndex+1)%actions.length;verb.textContent=actions[actionIndex];animateText(verb)}
  else{subjectIndex=(subjectIndex+1)%subjects.length;role.textContent=subjects[subjectIndex];animateText(role)}
  nextIsAction=!nextIsAction;
  window.setTimeout(changeOneLine,3600);
}
window.setTimeout(changeOneLine,3600);
const grid=document.querySelector("#signal-grid");for(let i=0;i<32;i++){const bar=document.createElement("i");bar.style.height=`${14+((i*23)%68)}%`;grid.appendChild(bar)}
