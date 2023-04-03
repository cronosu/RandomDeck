const selectedIndexes = [];
let data;

fetch('carte.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    for (let i = 0; i < 12; i++) {
      let randomNum;

      do {
        randomNum = Math.floor(Math.random() * data.length);
      } while (selectedIndexes.includes(randomNum));

      selectedIndexes.push(randomNum);
      let jsonData = data[randomNum];
      let name = jsonData.name;
      let carteImg = document.querySelector(`.carte-img${i}`);
      carteImg.src = `image/${name}.webp?v=20`;
    }
  })
  .catch(error => console.error(error));

function changeRandomImage(imgElement) {
  let randomNum;

  do {
    randomNum = Math.floor(Math.random() * data.length);
  } while (selectedIndexes.includes(randomNum));

  selectedIndexes.push(randomNum);
  let jsonData = data[randomNum];
  let name = jsonData.name;
  imgElement.src = `image/${name}.webp?v=20`;
}

const btns = document.querySelectorAll('.btn');
const cardImgs = document.querySelectorAll('.card img');

for (let i = 0; i < cardImgs.length; i++) {
  btns[i].addEventListener('click', () => changeRandomImage(cardImgs[i]));
}



const card = document.querySelectorAll(".card")

card.forEach(el => {
  el.addEventListener("mousemove", e => {

    let elRect = el.getBoundingClientRect()
    let x = e.clientX - elRect.x
    let y = e.clientY - elRect.y

    let midCarWidth = elRect.width / 2
    let midCarHeight = elRect.height / 3

    let angleY = -(x - midCarWidth) / 8
    let angleX = (y - midCarHeight) / 12

    let glowX = x / elRect.width * 100
    let glowY = y / elRect.height * 100

    el.querySelector('img').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`
    el.querySelector('.glow').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`

    el.querySelector('.glow').style.background = `radial-gradient(circle at ${glowX}% ${glowY}%,rgb(217, 235, 252, 0.5), transparent)`




  })
  el.addEventListener("mouseleave", () => {
    el.querySelector('.glow').style.background.remove;
    el.querySelector('.glow').style.transform = "rotateX(0) rotateY(0)"
    el.querySelector('img').style.transform = "rotateX(0) rotateY(0)"
    el.querySelector('.glow').style.background = '';
  })
})



