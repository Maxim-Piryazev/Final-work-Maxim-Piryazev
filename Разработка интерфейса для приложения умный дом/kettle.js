let btn = document.querySelector("#boiling");
let kettle = document.querySelector('.bub')

btn.addEventListener("click",() =>{
 kettle.style.display = 'block'

    let temp = document.querySelector(".temp span");
    tempRandom(temp);
  
  });
  
  const tempRandom = (tempEl) => {
    
    let delta = 28;
    let interval = setInterval(() => {
      delta = ( delta + (100/50));
      tempEl.innerHTML = parseInt(delta);
      if(parseInt(delta) >= 100){
        clearInterval(interval);
      }
    },400)
  }