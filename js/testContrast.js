const textColor = document.getElementById('colorText')
const bgColor = document.getElementById('colorBack');

const colorDisplay = document.querySelector('.displayTest');
const compDisplay = document.getElementById('testComp')

const contrastButton = document.getElementById('contrastButton');

textColor.addEventListener('change', () =>
    colorDisplay.style.color = textColor.value,
);

textColor.addEventListener('change', () =>
    compDisplay.style.fill = colorDisplay.style.color
    )

bgColor.addEventListener('change', () => 
    colorDisplay.style.backgroundColor = bgColor.value
);


/* //colorpicker and input both change the squarecolor
function updateDisplayBg(e){
    colorDisplay.style.backgroundColor = e.target.value;
}

colorSquare.addEventListener('click', () =>
    colorHex.value = colorSquare.style.backgroundColor
); */
