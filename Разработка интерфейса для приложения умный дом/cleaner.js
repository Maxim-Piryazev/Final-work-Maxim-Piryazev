let cleaner = document.getElementById('roborock');
let btn = document.querySelector('.btn-cleaner');
let error = document.querySelector('.error')
let percent = document.querySelector('.percent')

btn.addEventListener("click", () => {
   
        cleaner.classList.remove('paused')
        cleaner.classList.add('animation')

        let charge = document.querySelector(".percent");
        chargeRandom(charge);
    
    

});
const chargeRandom = (chargeEl) => {
    
    let delta = 100;
    let interval = setInterval(() => {
      delta = ( delta - (100/50));
      chargeEl.innerHTML = parseInt(delta);
      if(parseInt(delta) === 0){
        cleaner.classList.add('paused')
        error.innerHTML = 'Зарядите устройство!'
        btn.style.background = 'grey'
        percent.style.color = 'red'

        clearInterval(interval);
      }
    },300)
  }