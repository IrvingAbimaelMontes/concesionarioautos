const cars = [
  { marca: "Toyota", modelo: "Corolla", año: 2020, precio: 320000, imagen: "img/corolla.jpg" },
  { marca: "Honda", modelo: "Civic", año: 2022, precio: 350000, imagen: "img/civic.jpeg" },
  { marca: "Mazda", modelo: "3", año: 2020, precio: 370000, imagen: "img/mazda3.jpg" },
  { marca: "Ford", modelo: "Focus", año: 2018, precio: 300000, imagen: "img/focus.jpg" },
  { marca: "Chevrolet", modelo: "Onix", año: 2024, precio: 280000, imagen: "img/onix.jpg" },
  { marca: "Volkswagen", modelo: "Jetta", año: 2023, precio: 390000, imagen: "img/jetta.jpg" },
  { marca: "Nissan", modelo: "Sentra", año: 2021, precio: 310000, imagen: "img/sentra.jpg" },
  { marca: "Hyundai", modelo: "Elantra", año: 2022, precio: 330000, imagen: "img/elantra.jpg" },
  { marca: "Kia", modelo: "Rio", año: 2020, precio: 290000, imagen: "img/rio.jpg" },
  { marca: "Honda", modelo: "Accord", año: 2023, precio: 480000, imagen: "img/accord.jpg" },
  { marca: "Mazda", modelo: "CX-5", año: 2021, precio: 450000, imagen: "img/cx5.jpg" },
  { marca: "Toyota", modelo: "RAV4", año: 2022, precio: 520000, imagen: "img/rav4.jpg" },
  { marca: "Ram", modelo: "1500", año: 2024, precio: 720000, imagen: "img/ram1500.jpg" },
  { marca: "Chevrolet", modelo: "Silverado", año: 2023, precio: 680000, imagen: "img/silverado.jpg" },
  { marca: "Toyota", modelo: "Hilux", año: 2021, precio: 630000, imagen: "img/hilux.jpg" },
  { marca: "Nissan", modelo: "Frontier", año: 2023, precio: 610000, imagen: "img/frontier.jpg" },
  { marca: "Hyundai", modelo: "Tucson", año: 2022, precio: 480000, imagen: "img/tucson.jpeg" },
  { marca: "Kia", modelo: "Sportage", año: 2023, precio: 500000, imagen: "img/sportage.jpeg" }


];


const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterButton = document.getElementById("filterButton");


const filtrarPorTexto = (lista, texto) => 
  lista.filter(car => 
    car.marca.toLowerCase().includes(texto) || 
    car.modelo.toLowerCase().includes(texto)
  );


const filtrarPorPrecio = (lista, min, max) => 
  lista.filter(car => car.precio >= min && car.precio <= max);


const buscarAutoExacto = (lista, texto) =>
  lista.find(car => 
    car.marca.toLowerCase() === texto || 
    car.modelo.toLowerCase() === texto
  );


const obtenerPrecios = lista => lista.map(car => car.precio);


const calcularPromedio = lista => {
  const precios = obtenerPrecios(lista);
  const total = precios.reduce((acc, p) => acc + p, 0);
  return precios.length ? (total / precios.length).toFixed(2) : 0;
};


const mostrarAutos = lista => {
  resultsContainer.innerHTML = "";

  if (lista.length === 0) {
    resultsContainer.innerHTML = "<p>No se encontraron autos.</p>";
    return;
  }

  const cardsHTML = lista.map(car => `
    <div class="car-card">
      <img src="${car.imagen}" alt="${car.marca} ${car.modelo}">
      <h3>${car.marca} ${car.modelo}</h3>
      <p>Año: ${car.año}</p>
      <p>Precio: $${car.precio.toLocaleString()}</p>
    </div>
  `).join("");

  resultsContainer.innerHTML = cardsHTML;


  console.log("💰 Promedio de precios:", calcularPromedio(lista));
};


filterButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;


  const resultados = filtrarPorPrecio(
    filtrarPorTexto(cars, query),
    minPrice,
    maxPrice
  );

  mostrarAutos(resultados);


  const exacto = buscarAutoExacto(cars, query);
  if (exacto) console.log("🔍 Coincidencia exacta encontrada:", exacto);
});


mostrarAutos(cars);