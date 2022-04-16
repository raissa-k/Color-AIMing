//where to get color hex information
const textColor = document.getElementById('colorText')
const bgColor = document.getElementById('colorBack');

//where to display colors from input
const colorDisplay = document.querySelector('.displayTest');
const compDisplay = document.getElementById('testComp')

const contrastRatio = document.getElementById('contrastRatio')
const contrastButton = document.getElementById('contrastButton');

//change text color, square color, background color
textColor.addEventListener('change', () =>
    colorDisplay.style.color = textColor.value,
);
textColor.addEventListener('change', () =>
    compDisplay.style.fill = colorDisplay.style.color
    )
bgColor.addEventListener('change', () => 
    colorDisplay.style.backgroundColor = bgColor.value
);

//what to write to results
function writeContrast(data){
    const constrastDiv = document.querySelector('.contrastInfo');
    // deletes inner divs if there are any
    while (constrastDiv.firstChild){
        constrastDiv.removeChild(constrastDiv.firstChild)
    }
    //Creates all inner html for the div  
    document.querySelector('.contrastInfo').innerHTML += `<h4>Normal Text</h4><p>WCAG AA:</p><span class="${data.AA}">${data.AA}</span><p>WCAG AAA:</p><span class="${data.AAA}">${data.AAA}</span><h4>Large Text</h4><p>WCAG AA:</p><span class="${data.AALarge}">${data.AALarge}</span><p>WCAG AAA:</p><span class="${data.AAALarge}">${data.AAALarge}</span><h4>Components</h4><p>WCAG AA:</p><span class="${data.AA}">${data.AA}</span>`
}

//fetch from API
contrastButton.addEventListener('click', getFetch)
function getFetch(){
    //removes the # from input fields so they're API-ready
    const textChoice = textColor.value.slice(1)
    const bgChoice = bgColor.value.slice(1)
    const url = `https://webaim.org/resources/contrastchecker/?fcolor=${textChoice}&bcolor=${bgChoice}&api`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          contrastRatio.textContent = data.ratio
          writeContrast(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }
  