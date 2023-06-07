function renderOrder() {

  let valorTotal = 0;
  const orderDetail = document.getElementById('cart-detail-table')

  if (!orderDetail) {
    console.error("No se encontró el elemento con id 'cart-detail-table'");
    return;
  }

  //iterar el array para acceder a cada producto
  orderDetail.innerHTML = ""; //lo que hace esto o para lo que está es para que cada vez que se cargue la funcion, se borre toda la tabla

  if (Order.length === 0) {
    orderDetail.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td></tr>`; //colspan es para que ocupe hasta cierta cantidad de columnas

    return
  }

  // Agrupar productos por nombre
  const groupedProducts = Order.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = {
        ...curr,
        quantity: 0,
        total: 0
      };
    }
    acc[curr.name].quantity += curr.quantity;
    acc[curr.name].total += curr.total;
    return acc;
  }, {});

  // Convierto el objeto en array
  const productsArray = Object.values(groupedProducts);
  let suma = 0
  productsArray.forEach((producto, index) => {
    let imageSrc = producto.image ? '/upload/product/' + producto.image : '/assets/images/funciones-pagina/not-found.webp';
    console.log(producto._id)
    const tableRow = `
        <tr class="order-product">
            <td class="order-product__img-cell">
                <img class= "order-product__img" src="${imageSrc}" width="120px" alt="${producto.name}">                    
            </td>
            <td class= "order-product__name">
                ${producto.name}
            </td>
            <td class="order-product__quantity quantity-product">
              <button class="quantity-order-product__btn" id="restar" data-index="${index}" onclick="decreaseQuantity(event, ${index})">
                  -
              </button>
              <input type="number" class="quantity-product__input" value=${producto.quantity} data-index="${index}">    
              <button class="quantity-order-product__btn" id="sumar" data-index="${index}" onclick="increaseQuantity(event, ${index})">
                  +
              </button>
            </td>
            <td class="product__price" id="total-pedido-${index}">
              $ ${producto.price * producto.quantity}
            </td>        
            <td class= "product__actions">
                <button class="product__action-btn" onclick="deleteProduct(${index})"> 
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
        `
    orderDetail.innerHTML += tableRow
    suma += producto.price * producto.quantity
    valorTotal = Math.round(suma * 100) / 100;
    console.log(valorTotal)
  })
  updateTotal();
  const tableRow = `
        <tr class="order-import-total">
                <td class="order-import-total__text"  colspan = '3'>
                  TOTAL
                </td>
                <td class="order-import-total__price" id="valor-total" colspan = '2'>
                  $ ${valorTotal}
                </td>
        </tr>
        `
  orderDetail.innerHTML += tableRow;


}

renderOrder()

function buscarProducto(products, productName) {
  const productoEncontrado = products.find(producto => producto.name === productName);
  return productoEncontrado || null;
}

async function increaseQuantity(event, index) {
  const increaseBtn = event.target;
  const respuesta = await axios.get(`${URL}/products`)
  var products = respuesta.data.products

  const cantInput = document.querySelector(`.quantity-product__input[data-index="${index}"]`);
  const productoEncontrado = Order[index];

  // console.log("productoEncontrado:",productoEncontrado)
  // console.log("cantInput",cantInput)

  const productoExistente = products.find(product => product._id === productoEncontrado._id);

  if (!productoExistente) {
    console.error(`No se encontró ningún producto con el nombre ${productoEncontrado.name}`);
    return;
  }

  let cant = parseInt(cantInput.value);
  if (isNaN(cant)) {
    console.error(`No se pudo convertir el valor "${cantInput.value}" a un número`);
    return;
  }

  cant++;
  productoEncontrado.quantity = cant;
  productoEncontrado.total = Math.round(cant * productoEncontrado.price * 100) / 100;
  cantInput.value = cant;
  // console.log(cant)
  const productosEnCarrito = JSON.parse(sessionStorage.getItem('order'));
  const productoEnCarrito = productosEnCarrito.find(producto => producto.name === productoEncontrado.name);
  if (productoEnCarrito) {
    productoEnCarrito.quantity = cant;

    sessionStorage.setItem('order', JSON.stringify(productosEnCarrito));
  }

  const precioTotalHTML = document.getElementById(`total-pedido-${index}`);

  if (precioTotalHTML) {
    precioTotalHTML.innerText = `$ ${productoEncontrado.total}`;
  } else {
    console.error(`Element with ID "total-pedido-${index}" not found in the DOM`);
    return;
  }

  actualizarBadge();
  updateTotal();
}

function updateTotal() {
  let valorTotal = 0;

  Order.forEach((producto) => {
    valorTotal += Math.round((producto.quantity * producto.price) * 100) / 100;;
  });

  const totalHTML = document.getElementById('valor-total');
  if (totalHTML) {
    totalHTML.textContent = `$ ${valorTotal.toFixed(2)}`;
  }
}


async function decreaseQuantity(event, index) {
  const increaseBtn = event.target;
  const respuesta = await axios.get(`${URL}/products`)
  var products = respuesta.data.products

  const cantInput = document.querySelector(`.quantity-product__input[data-index="${index}"]`);
  const productoEncontrado = Order[index];

  // console.log("productoEncontrado:",productoEncontrado)
  // console.log("cantInput",cantInput)

  const productoExistente = products.find(product => product._id === productoEncontrado._id);

  if (!productoExistente) {
    console.error(`No se encontró ningún producto con el nombre ${productoEncontrado.name}`);
    return;
  }

  let cant = parseInt(cantInput.value);
  if (isNaN(cant)) {
    console.error(`No se pudo convertir el valor "${cantInput.value}" a un número`);
    return;
  }

  cant--;
  if (cant <= 0) {
    cant = 1
  }
  productoEncontrado.quantity = cant;
  productoEncontrado.total = Math.round(cant * productoEncontrado.price * 100) / 100;
  cantInput.value = cant;

  // Aca se actualiza el valor de la cantidad en el sessionStorage
  const productosEnCarrito = JSON.parse(sessionStorage.getItem('order'));
  const productoEnCarrito = productosEnCarrito.find(producto => producto.name === productoEncontrado.name);
  if (productoEnCarrito) {
    productoEnCarrito.quantity = cant;
    sessionStorage.setItem('order', JSON.stringify(productosEnCarrito));
  }

  const precioTotalHTML = document.getElementById(`total-pedido-${index}`);

  if (precioTotalHTML) {
    precioTotalHTML.innerText = `$ ${productoEncontrado.total}`;
  } else {
    console.error(`Element with ID "total-pedido-${index}" not found in the DOM`);
    return;
  }

  actualizarBadge();
  updateTotal();
}

function deleteProduct(id) {
  Order.splice(id, 1)
  //Guardarlo en el local storage
  sessionStorage.setItem('order', JSON.stringify(Order));

  renderOrder();
  showAlert('Producto Eliminado de la Orden')
  actualizarBadge()

}

async function finalizarCompra() {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const order = JSON.parse(sessionStorage.getItem('order'))
    console.log(currentUser._id)

    console.log(order._id)

    let valorTotal = 0;
    let suma = 0;
    const orden = {};
    const products = [];
    order.forEach((product) => {
      const producto = {
        productId: product.id,
        quantity: product.quantity,
        price: product.price
      }
      suma += producto.price * producto.quantity
      valorTotal = Math.round(suma * 100) / 100;
      products.push(product)
    });

    console.log(valorTotal)

    orden.products = products,
      orden.userId = currentUser._id,
      orden.total = valorTotal;
    orden.createdAt = Date.now;
    orden.status = 'onhold';
    orden.updateAt = Date.now;

    console.log(orden.products)
    console.log(orden.userId)
    console.log(orden.total)
    console.log(orden.createdAt)
    console.log(orden.status)
    console.log(orden.updateAt)

    await axios.post(`${URL}/orders`, orden);

    if (Order.length === 0) {
      showAlert('Debe seleccionar un producto para poder Finalizar la compra', 'advertencia')
    } else {
      sessionStorage.removeItem('order');
      Order = []; // Vacía el carrito
      renderOrder(); // Renderizar la orden antes de eliminar el contenido del carrito
      showAlert('Compra Finalizada', 'exito');
      window.location.replace("/order-detail");

    }

  } catch (error) {
    console.log(error)
  }
}


