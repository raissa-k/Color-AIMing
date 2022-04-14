const colorSquare = document.getElementById('colorSquare')
const colorPicker = document.getElementById('colorPicker');
const colorHex = document.getElementById('colorHex');
const paletteButton = document.getElementById('paletteButton');
let paletteForDiv = ''

colorPicker.addEventListener('change', updateSquare)
colorHex.addEventListener('change', updateSquare)
paletteButton.addEventListener('click', makePalette)

function updateSquare(e){
    colorSquare.style.backgroundColor = e.target.value;
}

colorSquare.addEventListener('click', () =>
    colorHex.value = colorSquare.style.backgroundColor
);


function makePalette() {
    const paletteBase = Array.from(colorSquare.style.backgroundColor.slice(4,-1).split(','));
    const url = "http://colormind.io/api/";
    const sendData = {
	model : "ui",
	input : [paletteBase,"N","N","N","N"],
}
    fetch(url, {
        method: "POST",
        body: JSON.stringify(sendData)
    })
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
        const paletteContainer = document.querySelector('.paletteSection');
        while (paletteContainer.firstChild){
            paletteContainer.removeChild(paletteContainer.firstChild)
        }
        for (let i = 0; i < data.result.length; i++){
            const div = document.createElement('div');
            const span = document.createElement('span')
            div.classList.add('paletteDiv');
            div.style.backgroundColor = `rgb(${data.result[i]})`;
            paletteContainer.appendChild(div);
            span.innerText = div.style.backgroundColor
            div.appendChild(span);
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}
