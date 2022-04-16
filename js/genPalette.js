const colorSquare = document.getElementById('colorSquare')
const colorPicker = document.getElementById('colorPicker');
const colorHex = document.getElementById('colorHex');
const paletteButton = document.getElementById('paletteButton');

colorPicker.addEventListener('change', updateSquare)
colorHex.addEventListener('change', updateSquare)
paletteButton.addEventListener('click', makePalette)

//colorpicker and input both change the squarecolor
function updateSquare(e){
    colorSquare.style.backgroundColor = e.target.value;
}

colorSquare.addEventListener('click', () =>
    colorHex.value = colorSquare.style.backgroundColor
);

//API returns rgb, this is so it can be converted to hex later
const rgbToHex = ([r, g, b]) => {
    var rgb = (r << 16) | (g << 8) | b
    return '#' + (0x1000000 + rgb).toString(16).slice(1) // #0080c0
}

function makePalette() {
    //removes 'rgb(' and ')' from the color property to fit API requirements, inserts to data sent
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
        // deletes inner divs if there are any
        while (paletteContainer.firstChild){
            paletteContainer.removeChild(paletteContainer.firstChild)
        }
        for (let i = 0; i < data.result.length; i++){
            const div = document.createElement('div');
            const span = document.createElement('span')
            //adds a div with background color for each result, converts array to rgb
            div.classList.add('paletteDiv');
            div.style.backgroundColor = `rgb(${data.result[i]})`;
            paletteContainer.appendChild(div);
        
            //makes a span with the hex value
            span.innerText += rgbToHex(data.result[i])
            div.appendChild(span);
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}
