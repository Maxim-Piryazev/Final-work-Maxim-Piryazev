const btn = document.getElementById('theme');
btn.addEventListener('click', () => {
    const Theme = document.body.className;
    if (Theme == 'dark') {
        document.body.className = 'light';
        btn.innerHTML = 'Отключить';
        localStorage.setItem('settingTheme', 'light');
    } 
    else {
        document.body.className = 'dark';
        btn.innerHTML = 'Включить';
        localStorage.setItem('settingTheme', 'dark');
    }
        

});


let settingTheme = localStorage.settingTheme;