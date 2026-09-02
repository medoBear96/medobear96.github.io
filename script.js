const roles=["embedded systems.","automation tools.","sailing technology.","things that work."];
const role=document.querySelector("#role");let index=0;
setInterval(()=>{index=(index+1)%roles.length;role.textContent=roles[index];role.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0)"}],{duration:550,easing:"ease",fill:"both"})},2400);
const grid=document.querySelector("#signal-grid");for(let i=0;i<32;i++){const bar=document.createElement("i");bar.style.height=`${14+((i*23)%68)}%`;grid.appendChild(bar)}
