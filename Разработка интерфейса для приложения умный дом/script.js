const dom = {
       selectbox: document.getElementById('selectbox'),
       selectboxList: document.querySelector('.selectbox_list'),
       rooms: document.getElementById('rooms'),
       settings: document.getElementById('settings'),
       settingsTabs: document.getElementById('settings-tabs'),
       settingsPanels: document.getElementById('settings-panel'),
       temperatureLine: document.getElementById('temperature-line'),
       temperatureRound: document.getElementById('temperature-round'),
       temperature: document.getElementById('temperature'),
       temperatureBtn: document.getElementById('temperature-btn'),
       temperatureSaveBtn: document.getElementById('save-temperature'),
       tempPowerBtn: document.getElementById('power'),
       sliders: {
              lights: document.getElementById('light-slider'),
              humidity: document.getElementById('humidity-slider'),

       },
       switch: {

              lights: document.getElementById('lights-power'),
              humidity: document.getElementById('humidity-power')
       }

}
const rooms = {
       all: 'Все комнаты',
       livingroom: 'Гостиная',
       bedroom: 'Спальня',
       kitchen: 'Кухня',
       batchroom: 'Санузел',
       studio: 'Кабинет',
       washingroom: 'Хозблок'
}

let activeRoom = 'all';
let activeTAb = 'temperature';
const roomsData = {
       all: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },

       livingroom: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },
       bedroom: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },
       kitchen: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },
       batchroom: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },
       studio: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       },
       washingroom: {
              temperature: 16,
              tempOff: false,
              lights: 100,
              lightsOff: false,
              humidity: 70,
              humidityOff: false
       }
}




// выпадающий список
dom.selectbox.querySelector('.selectbox_selected').onclick = (event) => {
       {
              dom.selectbox.classList.toggle('open')
       }
}
document.body.onclick = (event) => {
       const { target } = event
       if (!target.matches('.selectbox')
              && !target.parentElement.matches('.selectbox')
              && !target.parentElement.parentElement.matches('.selectbox')

       ) {
              dom.selectbox.classList.remove('open')
       }
}

dom.selectboxList.onclick = (event) => {
       const { target } = event
       if (target.matches('.selectbox_item')) {
              const { room } = target.dataset
              const selectedItem = dom.selectboxList.querySelector('.selected')
              selectedItem.classList.remove('.selected')
              target.classList.add('selected')
              dom.selectbox.classList.remove('open')
              selectRoom(room)
       }
}
//выбор комнаты;
function selectRoom(room) {
       const selectedRoom = dom.rooms.querySelector('.selected');
       if (selectedRoom) {
              selectedRoom.classList.remove('selected')
       }
       if (room != 'all') {
              const newSelectedRoom = dom.rooms.querySelector(`[data-room =${room}]`)
              const {
                     temperature,
                     lights,
                     humidity,
                     lightsOff,
                     humidityOff
              } = roomsData[room]
              activeRoom = room;
              newSelectedRoom.classList.add('selected')
              renderScreen(false)
              dom.temperature.innerHTML = temperature;
              renderTemperature();
              setTempPower()
              changeSettingsType(activeTAb);
              changeSlider(lights, dom.sliders.lights);
              changeSlider(humidity, dom.sliders.humidity);
              changeSwitch('lights', lightsOff);
              changeSwitch('humidity', humidityOff);

       } else {
              renderScreen(true)

       }
       const selectedSelectboxRoom = dom.selectbox.querySelector('.selectbox_item.selected')
       selectedSelectboxRoom.classList.remove('selected')
       const newSelectedItem = dom.selectbox.querySelector(`[data-room =${room}]`)
       newSelectedItem.classList.add('selected')
       const selectboxSelected = dom.selectbox.querySelector('.selectbox_selected span')
       selectboxSelected.innerHTML = rooms[room]

}



//
dom.rooms.querySelectorAll('.room').forEach(room => {
       room.onclick = (event) => {
              const value = room.dataset.room
              selectRoom(value)
       }
})

//отоброжение нужного экрана

function renderScreen(isRooms) {
       setTimeout(() => {

              if (isRooms) {
                     dom.rooms.style.display = 'grid'
                     dom.settings.style.display = 'none'
              }
              else {
                     dom.rooms.style.display = 'none'
                     dom.settings.style.display = 'block'

              }
       }, 300)
}


//------------------------------

function renderTemperature(temperature) {
       const min = 16;
       const max = 40;
       const range = max - min;
       const percent = range / 100;
       const lineMin = 54;
       const lineMax = 276;
       const lineRange = lineMax - lineMin;
       const linePercent = lineRange / 100;
       const roundMin = -240;
       const roundMax = 48;
       const roundRange = roundMax - roundMin;
       const roundPercent = roundRange / 100;


       if (temperature >= min && temperature <= max) {
              const finishpercent = Math.round((temperature - min) / percent);
              const lineFinishPercent = lineMin + linePercent * finishpercent

              const roundFinishPercent = roundMin + roundPercent * finishpercent
              dom.temperatureLine.style.strokeDasharray = `${lineFinishPercent} 276`
              dom.temperatureRound.style.transform = `rotate(${roundFinishPercent}deg)`
              dom.temperature.innerHTML = temperature

       }
}


function changeTemp() {
       let mouseover = false;
       let mousedown = false;
       let position = 0;
       let range = 0;
       let change = 0;
       dom.temperatureBtn.onmouseover = () => {
              mouseover = true;
              mousedown = false;
       }
       dom.temperatureBtn.onmouseout = () => mouseover = false;
       dom.temperatureBtn.onmouseup = () => mousedown = false;
       dom.temperatureBtn.onmousedown = (e) => {
              mousedown = true;
              position = e.offsetY;
              range = 0;
       }
       dom.temperatureBtn.onmousemove = (e) => {
              if (mouseover && mousedown) {
                     range = e.offsetY - position;
                     const newchange = Math.round(range / -10);
                     if (newchange != change) {
                            let temperature = + window.temperature.innerHTML
                            if (newchange < change) {
                                   temperature = temperature - 1;
                            }
                            else {
                                   temperature = temperature + 1;

                            }
                            change = newchange;
                            renderTemperature(temperature)
                     }
              }
       }
}
changeTemp()

// сохранение температуры
dom.temperatureSaveBtn.onclick = () => {

       const temperature = +dom.temperature.innerHTML;
       roomsData[activeRoom].temperature = temperature;
}

// отключение обогрева
dom.tempPowerBtn.onclick = () => {
       const power = dom.tempPowerBtn
       power.classList.toggle('off')
       if (power.matches('.off')) {
              roomsData[activeRoom].tempOff = true
       } else {
              roomsData[activeRoom].tempOff = false

       }
}
function setTempPower() {
       if (roomsData[activeRoom].tempOff) {

              dom.tempPowerBtn.classList.add('off')

       } else {
              dom.tempPowerBtn.classList.remove('off')

       }
}


//переключение настроек
dom.settingsTabs.querySelectorAll('.tab').forEach((tab) => {
       tab.onclick = () => {

              const optionType = tab.dataset.type
              activeTAb = optionType
              changeSettingsType(optionType)
       }
})
// смена панели настроек

function changeSettingsType(type) {
       const tabSelected = dom.settingsTabs.querySelector('.tab.selected')
       const panelSelected = dom.settingsPanels.querySelector('.selected')
       const tab = dom.settingsTabs.querySelector(`[data-type = ${type}]`)
       const panel = dom.settingsPanels.querySelector(`[data-type = ${type}]`)
       tabSelected.classList.remove('selected');
       panelSelected.classList.remove('selected');
       tab.classList.add('selected');
       panel.classList.add('selected');

}


// изменение слайдера
function changeSlider(percent, slider) {
       if (percent >= 0 && percent <= 100) {
              const { type } = slider.parentElement.parentElement.dataset
              slider.querySelector('span').innerHTML = percent;
              slider.style.height = `${percent}%`
              roomsData[activeRoom][type] = percent
       }
}

//изменение слайдера
function watchSlider(slider) {
       let mouseover = false;
       let mousedown = false;
       let position = 0;
       let pagePosition = 0;
       let range = 0;
       let change = 0;
       const parent = slider.parentElement;
       parent.onmouseover = () => {
              mouseover = true;
              //mousedown = false;
       }

       parent.onmouseout = () => mouseover = false;
       document.body.addEventListener("mouseup", () => { 
              mousedown = false; 
       });
       parent.onmousedown = (e) => {
              mousedown = true;
              position = e.offsetY;
              pagePosition = e.clientY;
              range = 0;
       }

       document.body.addEventListener("mousemove", (e) => {
              if (mousedown) {
                     let percent = +slider.querySelector('span').innerHTML;
                     let pageDelta = pagePosition - e.clientY;
                     let coordCoef = 110;
                     let newPosition = percent + pageDelta / coordCoef;

                     console.log(`pagePosition = ${pagePosition}, newPosition = ${newPosition}, pageDelta = ${pageDelta} e.clientY=${e.clientY}`);
                     newPosition = Math.round(newPosition);

                     if (newPosition < 0) newPosition = 0;
                     if (newPosition > 100) newPosition = 100;

                     changeSlider(newPosition, slider);

                     // range = e.offsetY - position;
                     // const newchange = Math.round(range / -0.2);
                     // if (newchange != change) {
                     //        let percent = +slider.querySelector('span').innerHTML
                     //        if (newchange < change) {
                     //               percent = percent - 1;
                     //        }
                     //        else {
                     //               percent = percent + 1;

                     //        }
                     //        change = newchange;
                     //        changeSlider(percent, slider)
                     // }

              }
       });
}
watchSlider(dom.sliders.lights);
watchSlider(dom.sliders.humidity);


//включение отключеие света
function changeSwitch(activeTAb, isOff) {
       if (isOff) {
              dom.switch[activeTAb].classList.add('off');
       }
       else {
              dom.switch[activeTAb].classList.remove('off');

       }
       roomsData[activeRoom][`${activeTAb}off`] = isOff;
}

dom.switch.humidity.onclick = () => {
       const isOff = !dom.switch.humidity.matches('.off');
       changeSwitch(activeTAb, isOff);
}

dom.switch.lights.onclick = () => {
       const isOff = !dom.switch.lights.matches('.off');
       changeSwitch(activeTAb, isOff);
}