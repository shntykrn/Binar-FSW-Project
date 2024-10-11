document.getElementById('search-btn').addEventListener('click', function(e) {
  e.preventDefault();

  // Ambil nilai dari input pengguna
  const driverType = document.getElementById('driver').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const passengers = document.getElementById('passengers').value;

  // Periksa apakah input sudah diisi dengan benar
  if (!driverType || !date || !time) {
      alert("Harap isi semua field yang wajib.");
      return;
  }

  // Ambil data mobil dari cars.json
  fetch('cars.json')
      .then(response => response.json())
      .then(cars => {
          // Filter mobil berdasarkan input pengguna
          const filteredCars = cars.filter(car => {
              const isDriverTypeMatch = car.driverType === driverType;
              const isPassengerMatch = passengers ? car.passengerCapacity >= passengers : true;
              
              return isDriverTypeMatch && isPassengerMatch;
          });

          // Tampilkan hasil pencarian
          displayCars(filteredCars);
      })
      .catch(error => console.error('Error fetching cars data:', error));
});

// Fungsi untuk menampilkan hasil pencarian
function displayCars(cars) {
  const carsContainer = document.getElementById('cars-container');
  carsContainer.innerHTML = ''; // Kosongkan kontainer hasil

  if (cars.length === 0) {
      carsContainer.innerHTML = '<p>Tidak ada mobil yang sesuai dengan kriteria pencarian Anda.</p>';
      return;
  }

  cars.forEach(car => {
      const carElement = `
          <div class="card mb-3">
              <img src="${car.image}" class="card-img-top" alt="${car.name}">
              <div class="card-body">
                  <h5 class="card-title">${car.name}</h5>
                  <p class="card-text">Tipe Driver: ${car.driverType}</p>
                  <p class="card-text">Kapasitas Penumpang: ${car.passengerCapacity}</p>
                  <p class="card-text">Harga: Rp ${car.price.toLocaleString()}</p>
                  <a href="#" class="btn btn-primary">Pilih Mobil</a>
              </div>
          </div>
      `;
      carsContainer.innerHTML += carElement;
  });
}
