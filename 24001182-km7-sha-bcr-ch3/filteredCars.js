import cars from './cars.json' with { type: 'json' };
import getListCars from './listCars.js';
export default function filterCars(cars) {
  // Logika filter mobil berdasarkan input
  const driverType = document.getElementById('driver').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const passengers = document.getElementById('passengers').value;

  const filteredCars = cars.filter(car => {
    const isDriverMatch = driverType === '' || car.driverType === driverType;
    const isDateMatch = date === '' || new Date(car.availableAt).toISOString().split('T')[0] === date;
    const isTimeMatch = time === '' || new Date(car.availableAt).getHours() === parseInt(time);
    const isPassengerMatch = passengers === '' || car.capacity >= parseInt(passengers);

    return isDriverMatch && isDateMatch && isTimeMatch && isPassengerMatch;
  });

  return filteredCars;
}


// Fungsi untuk filter mobil berdasarkan input
function applyFilters(cars) {
  const driverType = document.getElementById('driver').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const passengers = document.getElementById('passengers').value;

  const filteredCars = cars.filter(car => {
    const isDriverMatch = driverType === '' || car.driverType === driverType;
    const isDateMatch = date === '' || new Date(car.availableAt).toISOString().split('T')[0] === date;
    const isTimeMatch = time === '' || new Date(car.availableAt).getHours() === parseInt(time);
    const isPassengerMatch = passengers === '' || car.capacity >= parseInt(passengers);

    return isDriverMatch && isDateMatch && isTimeMatch && isPassengerMatch;
  });

  renderCars(filteredCars);
}

// Fungsi untuk menampilkan hasil filter mobil
function renderCars(cars) {
  const carsContainer = document.getElementById('cars-container');
  carsContainer.innerHTML = ''; 

  if (cars.length === 0) {
    carsContainer.innerHTML = '<p>No cars found</p>';
    return;
  }

  cars.forEach(car => {
    const carElement = document.createElement('div');
    carElement.classList.add('car-item');
    carElement.innerHTML = `
      <div class="car-card">
        <h3>${car.name}</h3>
        <p>Driver Type: ${car.driverType}</p>
        <p>Available At: ${car.availableAt}</p>
        <p>Capacity: ${car.capacity} Passengers</p>
      </div>
    `;
    carsContainer.appendChild(carElement);
  });
}

// Event listener pada tombol submit
const submitButton = document.getElementById("submit");

if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();  
    const freshCars = randomizeCars();  // Dapatkan data mobil
    applyFilters(freshCars);            // Filter mobil dan tampilkan
  });
} 
