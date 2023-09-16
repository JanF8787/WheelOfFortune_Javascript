const wheel = document.getElementById('wheel');
const myOptions = document.getElementById('my-options');
const spinButton = document.getElementById('spin-button');
const addOptionButton = document.getElementById('add-option');
const previousPrize = document.getElementById('previous-prize');

let options = ['0$', '50$', "75$", '100$', '200$', '500$', "1000$", "present"];
wheel.style.setProperty('--totalSections', options.length);

function updatePrices() {
  wheel.innerHTML = '';
  myOptions.innerHTML = '';

  options.forEach((option, index) => {
    const wheelSection = document.createElement('div');
    const myList = document.createElement('div');
    const myOption = document.createElement('div');
    const mySpan = document.createElement('span');
    const xButton = document.createElement('button');

    wheelSection.classList.add('wheel-section');
    myList.classList.add('list');
    myOption.classList.add('option');
    xButton.classList.add('x');

    wheelSection.style = `--i:${index + 1.5}`;
    myOption.textContent = option;
    mySpan.textContent = option;
    xButton.textContent = "X";
    xButton.setAttribute('id', index);

    xButton.addEventListener('click', () => {
      deleteOption(index);
    });

    if (index % 2 == 0) {
      wheelSection.style.background = `rgb(185, 59, 59)`;
    } else {
      wheelSection.style.background = `rgb(102, 98, 98)`;
    }

    wheelSection.appendChild(mySpan);
    wheel.appendChild(wheelSection);

    myList.appendChild(myOption);
    myList.appendChild(xButton);
    myOptions.appendChild(myList);
  });
}

updatePrices();

let currentRotationAngle = 0;
let normalizedAngle;
let degreePerSection;

function calculateAngleAndDegreePerSection() {
  const totalSections = options.length;
  degreePerSection = 360 / totalSections;
  normalizedAngle = (360 - currentRotationAngle) % 360;
}


spinButton.addEventListener('click', () => {
  if (options.length != 8) {
    alert(`You have to add ${8 - options.length} option(s).`);
  } else {
    const randomDegree = Math.floor(Math.random() * 360);
    const rotationCount = 5 + Math.floor(Math.random() * 5);
    const totalRotation = (360 * rotationCount) + randomDegree;

    currentRotationAngle = totalRotation % 360;

    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${totalRotation}deg)`;
  }
});

wheel.addEventListener('transitionend', () => {
  calculateAngleAndDegreePerSection();

  const selectedOptionIndex = Math.floor(normalizedAngle / degreePerSection);
  const selectedOption = options[selectedOptionIndex];
  previousPrize.textContent = `Previous prize : ${selectedOption}`;
});

addOptionButton.addEventListener('click', () => {
  if (options.length >= 8) {
    alert('You have to delete one option to add new.')
  } else {
    const newOption = prompt('Enter the new option:');
    options.push(newOption);
    updatePrices();
  }
});

function deleteOption(index) {
  options.splice(index, 1);
  updatePrices();
}