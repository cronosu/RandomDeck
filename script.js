const selectedIndexes = [];
const descrition = document.querySelectorAll(".description");
const img = document.querySelectorAll(".carte");
const glow = document.querySelectorAll(".glow");


let data;

const fichierjson = fetch('carte.json')
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
      let ability = data[randomNum].ability;
      let descriptions = document.querySelectorAll(`.description${i}`);
      descriptions.forEach(description => {
        description.innerText = ability;
      });

      carteImg.src = `image/${name}.webp?v=20`;
    };
  })
  .catch(error => console.error(error));




  function changeRandomImage(imgElement, descriptions) {
    let randomNum;
  
    do {
      randomNum = Math.floor(Math.random() * data.length);
    } while (selectedIndexes.includes(randomNum));
  
    selectedIndexes.push(randomNum);
    let jsonData = data[randomNum];
    let name = jsonData.name;
    imgElement.src = `image/${name}.webp?v=20`;
  
    let ability = data[randomNum].ability;
  
    descriptions.forEach(description => {
      description.innerText = ability;
    });
  }
  
  const btns = document.querySelectorAll('.btn');
  const cardImgs = document.querySelectorAll('.card img');
  
  for (let i = 0; i < cardImgs.length; i++) {
    const descriptions = document.querySelectorAll(`.description${i}`);
    btns[i].addEventListener('click', () => changeRandomImage(cardImgs[i], descriptions));
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
    el.querySelector('.glow').style.background.remove;
    el.querySelector('.glow').style.transform = "rotateX(0) rotateY(0)";
    el.querySelector('img').style.transform = "rotateX(0) rotateY(0)";
    el.querySelector('.glow').style.background = '';
  })
})

for (let i = 0; i < glow.length; i++) {
  glow[i].addEventListener("click", function () {
    glow[i].style.transition = "transform 0.5s ease";
    img[i].style.transition = "transform 0.5s ease";

    img[i].style.filter = 'brightness(0%)';

    descrition[i].classList.add("descriptionVisible");
  });
}


for (let i = 0; i < glow.length; i++) {
  glow[i].addEventListener("mouseleave", function () {
    descrition[i].classList.remove("descriptionVisible");
    img[i].style.filter = 'none';
  });
}


