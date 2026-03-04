let zIndex = 1;

window.onload = () => {
  setTimeout(()=>boot.style.display="none",2000);
  if(localStorage.theme) document.body.className=localStorage.theme;
  if(localStorage.notes) notes.value=localStorage.notes;
};

function toggleStart(){
  start.style.display =
    start.style.display==="block"?"none":"block";
}

function openApp(id){
  const win=document.getElementById(id);
  win.style.display="flex";
  win.style.zIndex=++zIndex;
}

function closeApp(id){
  document.getElementById(id).style.display="none";
}

function minimizeApp(id){
  document.getElementById(id).style.display="none";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.theme=document.body.className;
}

function press(v){ display.value+=v; }
function calculate(){ try{display.value=eval(display.value);}catch{display.value="Error";}}
function clearCalc(){ display.value=""; }

function saveNotes(){ localStorage.notes=notes.value; }

function loadSite(){
  let input=url.value.trim();
  if(!input) return;

  if(!input.includes(".")){
    frame.src="https://duckduckgo.com/?q="+encodeURIComponent(input);
    return;
  }

  if(!input.startsWith("http"))
    input="https://"+input;

  frame.src=input;
}

function goBack(){ frame.contentWindow.history.back(); }
function goForward(){ frame.contentWindow.history.forward(); }

url.addEventListener("keydown",e=>{
  if(e.key==="Enter") loadSite();
});

function dragStart(e,win){
  let shiftX=e.clientX-win.getBoundingClientRect().left;
  let shiftY=e.clientY-win.getBoundingClientRect().top;

  function moveAt(pageX,pageY){
    win.style.left=pageX-shiftX+"px";
    win.style.top=pageY-shiftY+"px";
  }

  function onMouseMove(e){
    moveAt(e.pageX,e.pageY);
  }

  document.addEventListener("mousemove",onMouseMove);

  document.onmouseup=function(){
    document.removeEventListener("mousemove",onMouseMove);
    document.onmouseup=null;
  };
}
