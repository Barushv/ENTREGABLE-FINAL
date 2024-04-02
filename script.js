// Array de productos disponibles
const productos = [
  { id: 1, nombre: "Tenis Nike Air Max 270", precio: 100, stock: 10 },
  { id: 2, nombre: "Tenis Nike Zoom Pegasus 38", precio: 120, stock: 7 },
  { id: 3, nombre: "Tenis Nike React Infinity Run", precio: 150, stock: 5 },
  { id: 4, nombre: "Tenis Nike Air Force 1", precio: 200, stock: 3 },
  { id: 5, nombre: "Tenis Nike Kyrie 7", precio: 210, stock: 20 },
  { id: 6, nombre: "Tenis Nike SB Dunk", precio: 320, stock: 1 },
  { id: 7, nombre: "Tenis Nike Joyride Run Flyknit", precio: 250, stock: 5 },
  { id: 8, nombre: "Tenis Nike Air Zoom Pegasus", precio: 150, stock: 3 },
  { id: 9, nombre: "Tenis Nike Blazer Mid '77", precio: 200, stock: 3 },
  { id: 10, nombre: "Tenis Nike Mexican Huarache", precio: 1200, stock: 1 },
];

// Función para mostrar los productos en la página
function mostrarProductos() {
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";
  productos.forEach((producto) => {
    const productoHTML = `
            <div class="producto">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
                <span class="stock">Stock: ${producto.stock}</span>
            </div>
        `;
    productosContainer.innerHTML += productoHTML;
  });
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  carritoLista.innerHTML = "";
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;
  carrito.forEach((item) => {
    const carritoItem = document.createElement("li");
    carritoItem.className = "carrito-item list-group-item";
    carritoItem.innerHTML = `
            <span>${item.nombre} - $${item.precio}</span>
            <button class="btn-eliminar btn btn-danger" data-id="${item.id}">Eliminar</button>
        `;
    carritoLista.appendChild(carritoItem);
    total += item.precio;
  });
  document.getElementById("total").textContent = `Total: $${total}`;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((producto) => producto.id === id);
  if (producto && producto.stock > 0) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    producto.stock--;
    mostrarProductos();
    mostrarCarrito();
  }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = carrito.findIndex((item) => item.id === id);
  if (index !== -1) {
    const producto = carrito[index];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // Incrementar el stock del producto eliminado del carrito
    const productoOriginal = productos.find((p) => p.id === id);
    if (productoOriginal) {
      productoOriginal.stock++;
      mostrarProductos();
    }
    mostrarCarrito();
  }
}

// Event listeners para agregar y eliminar productos del carrito
document
  .getElementById("productos-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-agregar")) {
      const id = parseInt(event.target.getAttribute("data-id"));
      agregarAlCarrito(id);
    }
  });

document
  .getElementById("carrito-lista")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-eliminar")) {
      const id = parseInt(event.target.getAttribute("data-id"));
      eliminarDelCarrito(id);
    }
  });

// Event listener para realizar la compra
document
  .getElementById("realizar-compra-btn")
  .addEventListener("click", function () {
    const confirmacion = confirm("¿Estás seguro de realizar la compra?");
    if (confirmacion) {
      localStorage.removeItem("carrito");
      mostrarCarrito();
      alert("¡Compra realizada con éxito!");
    }
  });

// Mostrar productos al cargar la página
mostrarProductos();
mostrarCarrito();
