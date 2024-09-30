async function loadCars() {
  const response = await fetch('./cars.json');
  if (!response.ok) {
    throw new Error('Failed to load cars.json');
  }
  const cars = await response.json();
  return cars;
}

// Panggil fungsi ini di tempat yang sesuai
loadCars().then(cars => {
  // Lakukan operasi pada data cars di sini
  console.log(cars); // cek apakah data mobil dimuat dengan benar
  currentCars = cars;
}).catch(error => {
  console.error(error);
});

import getListCars from './listCars.js';
import filterCars from './filteredCars.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeCars() {
  // Deep clone the original cars data
  const clonedCars = cars.map(car => ({ ...car }));

  clonedCars.map((car) => {
    const timeAt = new Date();
    const randomDays = getRandomInt(0, 7);
    const availableAt = new Date(timeAt.getTime() + randomDays * 24 * 60 * 60 * 1000);

    const randomHour = getRandomInt(8, 19);
    availableAt.setHours(randomHour, 0, 0, 0);

    car.availableAt = availableAt.toISOString().split('T')[0]; // hanya tanggal
  });

  localStorage.setItem('randomCars', JSON.stringify(clonedCars));

  return clonedCars; // Return the cloned array with modifications
}

// Get initial data (either from localStorage or by randomizing)
let currentCars = JSON.parse(localStorage.getItem('randomCars'));

if (!Array.isArray(currentCars) || currentCars.length === 0) {
  currentCars = randomizeCars();
}

const randomizeButton = document.getElementById("randomize");
const submitButton = document.getElementById("submit");

if (randomizeButton) {
  randomizeButton.addEventListener("click", () => {
    // Get a fresh clone for getListCars to avoid side effects
    const freshCars = randomizeCars();
    getListCars(freshCars);
  });
}

if (submitButton) {
  submitButton.addEventListener("click", () => {
    // Get a fresh clone for filterCars to avoid side effects
    const freshCars = randomizeCars();
    filterCars(freshCars);
  });
}
