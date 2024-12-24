window.addEventListener("load", () => {
    const form = document.querySelector("#modalForm");
    const regExpName = /^[а-яА-ЯёЁ\s]+$/;
    const regExpPin = /^\d+$/;
    const regExpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
    let isValidate = false;
    const nameInput = document.getElementById('modal__name');
    const newBtn = document.getElementById('btn_continue')
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Действие при нажатии на кнопку
            //  отображаем сообщение об успехе
            if (nameInput.value) {
                const Message = document.createElement('p');
                const delForm = document.getElementById('noneForm')
                delForm.style.display = 'none'
                Message.innerHTML = `${nameInput.value},<br> вы успешно зарегистрированы в системе умного дома!`;
                newBtn.style.display = 'block'
                form.prepend(Message);
            }

            // console.log(form["pin"].value)

        })
    // user friendly 

    newBtn.addEventListener('click', (e) => {
        window.location.href = "index.html"
    });


    const validateElem = (elem) => {
        if (elem.name == "name1") {
            if (!regExpName.test(elem.value) && elem.value != "") {
                elem.nextElementSibling.innerHTML =
                    "Пожалуйста, введите  корректное имя, Имя не может содержать меньше  3 символов";
                isValidate = false;
            } else {
                elem.nextElementSibling.innerHTML = "";
                isValidate = true;
            }
        }
        if (elem.name == "pin") {
            if ((!regExpPin.test(elem.value) || elem.value.length < 4) && elem.value != "") {
                elem.nextElementSibling.innerHTML =
                    "Пожалуйста, введите  корректный пароль, Пароль не может содержать меньше  4 символов";
                isValidate = false;
            } else {
                elem.nextElementSibling.innerHTML = "";
                isValidate = true;
            }
        }
        if (elem.name == "email") {
            if (!regExpEmail.test(elem.value) && elem.value != "") {
                elem.nextElementSibling.innerHTML =
                    "Пожалуйста, введите  корректный Email";
                isValidate = false;
            } else {
                elem.nextElementSibling.innerHTML = "";
                isValidate = true;
            }
        }
    };
    for (let elem of form.elements) {
        if (elem.tagName != "button") {
            elem.addEventListener("blur", () => {
                validateElem(elem);
            });
        }
    }

});

// запоминание пароля
let password = {};
const pinCod = document.getElementById('modal__pin')
const LS = localStorage;
 pinCod.addEventListener('input', (e) => {
    password[e.target.name] = e.target.value
    LS.setItem('password', JSON.stringify(password));
 })

 //восстановить пароль
 if(LS.getItem('password')) {
  const  password = JSON.parse(LS.getItem('password'));
    console.log(password);
 }