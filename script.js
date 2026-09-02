const phrases=[
  ["I build","embedded systems."],
  ["I make","automation tools."],
  ["I design","sailing technology."],
  ["I connect","software to the real world."],
  ["I turn","ideas into working systems."]
];
const verb=document.querySelector("#verb");const role=document.querySelector("#role");let index=0;
setInterval(()=>{index=(index+1)%phrases.length;verb.textContent=phrases[index][0];role.textContent=phrases[index][1];[verb,role].forEach(element=>element.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0)"}],{duration:550,easing:"ease",fill:"both"}))},3600);
const grid=document.querySelector("#signal-grid");for(let i=0;i<32;i++){const bar=document.createElement("i");bar.style.height=`${14+((i*23)%68)}%`;grid.appendChild(bar)}
