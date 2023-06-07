


const signIn = document.getElementById('sign-in');
const navbarList = document.getElementById('navbar-list')
let Users = []
const token = localStorage.getItem('token');


// if (!Users || Users.length === 0) {
//     Users = [
//         {
//             "name": "MATIAS BILONI",
//             "age": "28",
//             "password": "alfabeta",
//             "email": "admin@gmail.com",
//             "gender": "2",
//             "role": "ADMIN_ROLE"
//         },
//         {
//             "name": "USUARIO",
//             "age": "28",
//             "password": "alfabeta",
//             "email": "madbil@gmail.com",
//             "gender": "3",
//             "role": "USER_ROLE"
//         }
//     ];
//     localStorage.setItem("users", JSON.stringify(Users));
// }



let Products = [];



// console.log(Products)


// if (!Products || Products.length === 0) {
//     Products = [{
//         name: "Teclado Logitech G213 Prodigy RGB Gaming Español",
//         description: "-Interruptor: Semi-Mecanico <br>                    -Tipo De Conexion: Cableada <br>                    -Largo Del Cable: 1.8 M <br>                    -Tipo De Conector: USB <br>                    -Retroiluminado: LED<br>",
//         price: 13275.39,
//         image: "/assets/images/products/Teclado-logitech.webp"
//     },
//     {
//         name: "Mouse Pad T-Dagger Lava S",
//         description: ` -Tamaño:  S   <br>                    -Deslizamiento:   Rapido <br>                    -MaterialTela: Caucho <br>                    -Conexion:    No <br>                    -Alto / Ancho: 290 Mm X 240 Mm <br>                    -Grosor: 3 Mm <br>`,
//         price: 847.32,
//         image: "/assets/images/products/Mouse-pad.webp"
//     },
//     {
//         name: "Mouse Thermaltake Neros RGB 3200 Dpi",
//         description: `-Tipo De Conexion: Cableado <br>
//                     -Tipo De Conector: USB <br>
//                     -Tipo: Optico <br>
//                     -Sensor: PIXART PMW-3050 <br>
//                     -DPI: 750, 1500, 2000, 2500, 3200 Dpi <br>`,
//         price: 4950.84,
//         image: "/assets/images/products/Mouse-thermaltake.webp"
//     },
//     {
//         name: "CPU Cooler Aigo ICE400 Fixed RGB",
//         description: `-Consumo: 12 VDC <br>\n
//                     -TDP: 150 W  <br>\n
//                     -Tipo De Refrigeracion: Aire <br>\n
//                     -Velocidad Del Fan: 800 - 1.800 RPM <br>\n
//                     -Iluminacion: Si <br>\n
//                     -Nivel Maximo De Ruido: 36 DB <br>\n
//                     -Dimensiones: 122 Mm X 75 Mm X 158 Mm <br>\n
//                     -Socket Compatibles: Intel LGA 115x/ 1200 / 775 - AMD AM4/ AM3+/ AM3 / FM2 / FM1 / AM2+ / AM2`,
//         price: 7614.65,
//         image: "/assets/images/products/Cooler-aigo.webp"
//     },
//     {
//         name: "Webcam Solarmax Look Pro 2000 QHD 2K Autofocus",
//         description: `-Microfono Incorporado: Si<br>\n
//                     -Campo Visual: 90 Grados<br>\n
//                     -Resolucion Máxima: 2592 X 1944<br>\n
//                     -Peso: 160g<br>\n
//                     -Alto: 30 Mm<br>\n
//                     -Ancho: 111 Mm<br>\n
//                     -Profundidad: 80 Mm<br>`,
//         price: 5473.73,
//         image: "/assets/images/products/Webcam-solamarx.webp"
//     },
//     {
//         name: "Monitor Led Curvo 27\" VIEWSONIC VX2768-2KPC-MHD QHD 144Hz",
//         description: `-Tipo De Panel: MVA <br>\n
//                     -Pantalla: Curvo <br>\n
//                     -Ancho: 610 Mm <br>\n
//                     -Alto: 452 Mm Con Base <br>\n
//                     -Tamaño De Pantalla: 27\"<br>\n
//                     -Entrada VGA: No <br>\n
//                     -Entrada DisplayPort: 1 <br>\n
//                     -Entrada HDMI 2.0: 2 <br>`,
//         price: 136081.44,
//         image: "/assets/images/products/Monitor-omni.webp"
//     },
//     {
//         name: "Gabinete Gigabyte Aorus C700 Glass",
//         description: `-Factor Mother: Mini ITX / Micro ATX / -ATX / E-ATX   <br>\n
//                     -Ventana: Si <br>\n
//                     -Tipo De Ventana: Vidrio <br>\n
//                     -Colores: Negro  <br>\n
//                     -USB 3.1 Type C: 1   <br>\n
//                     -USB 3.0: 4  <br>\n
//                     -HDMI: 1 <br>\n
//                     -Audio HD: Si <br>`,
//         price: 194600.65,
//         image: "/assets/images/products/Gabinete-Gigabyte.webp"
//     },
//     {
//         name: "Micro AMD Ryzen 9 7900X 4.7 Ghz AM5",
//         description: `-Modelo: Ryzen 9 7900x <br>\n
//                     -Familia: AMD <br>\n
//                     -Nucleos: 12 <br>\n
//                     -Hilos: 24 <br>\n
//                     -Frecuencia Max.: Hasta 5.6 GHz <br>\n
//                     -Proceso De Fabricacion: TSMC 5nm FinFET <br>\n
//                     -Grafica Integrada: AMD Radeon Graphics <br>\n
//                     -Socket: AM5 <br>`,
//         price: 190997.89,
//         image: "/assets/images/products/Ryzen-9.webp"
//     },
//     {
//         name: "Placa de Video Lenovo By MSI Nvidia Geforce RTX 3080 10GB GDDR6X",
//         description: `-Tipo De Conexion PCI Express 4.0 <br>\n
//                     -Chipset GPU RTX 3080 <br>\n
//                     -Producto LHR Si <br>\n
//                     -Salidas HDMI 1 <br>\n
//                     -Salidas DVI-D No <br>\n
//                     -Salidas DisplayPort 3 <br>\n
//                     -Salidas VGA No <br>\n
//                     -Consumo 350 W <br>`,
//         price: 258495.02,
//         image: "/assets/images/products/Nvidia-Geforce-RTX-3080-10GB.webp"
//     },
//     {
//         name: "Motherboard Asus Rog Strix Z690-I Gaming Wifi DDR5 S1700",
//         description: `-Socket: 1700 <br>\n
//                     -Chipset: Z690 <br>\n
//                     -Plataforma: Intel <br>\n
//                     -Salidas HDMI: 1 <br>\n
//                     -Salidas VGA: No <br>\n
//                     -Salidas DisplayPort: No <br>\n
//                     -Salidas DVI-D: No <br>\n
//                     -Puertos SATA: 4 <br>\n
//                     -Slot M2: 2 <br>\n
//                     -Slot PCI-E 16X: 1 <br>`,
//         price: 142027.11,
//         image: "/assets/images/products/Motherboard-Asus-Rog-Strix-Z690.webp"
//     },
//     {
//         name: "Micro Intel I9-11900KF 5.3Ghz 16Mb S.1200",
//         description: `-Modelo: I9 11900KF <br>\n
//                     -Familia: Intel <br>\n
//                     -Nucleos: 8 <br>\n
//                     -Hilos: 16 <br>\n
//                     -Frecuencia: 5.3 Ghz <br>\n
//                     -Proceso De Fabricacion: 14 Nm <br>\n
//                     -Grafica Integrada: N/A <br>\n
//                     -Socket: S.1200 <br>`,
//         price: 148608.38,
//         image: "/assets/images/products/Intel-i9.webp"
//     },
//     {
//         name: "Silla Gamer Genesis Nitro 950 Black",
//         description: `-Capacidad De Peso: 150 Kg <br>\n
//                     -Peso Del Producto: 24.5 Kg <br>\n
//                     -Accesorios: NO <br>\n
//                     -Ancho Del Respaldo: 520 Mm <br>\n
//                     -Largo Del Respaldo: 865 Mm <br>\n
//                     -Ajuste De Altura: Si <br>`,
//         price: 128864.87,
//         image: "/assets/images/products/Silla-gamer-genesis.webp"
//     }];

//     localStorage.setItem("Products", JSON.stringify(Products))

// }

let Order = JSON.parse(sessionStorage.getItem("order")) || [];

const badgeHTML = document.getElementById('card-count')

// va a ser la lista de lo que la persona ordene y vaya agregando
function actualizarBadge() {
    let totalQuantity = 0;
    Order.forEach((producto) => {
        totalQuantity += producto.quantity
    })


    badgeHTML.innerText = totalQuantity
}


actualizarBadge()

function renderHeaderLinks(){    

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    if(currentUser){//pregunta si el usuario existe
        signIn.innerHTML =  '<div onclick="logout()" class="navbar__nav-link">Logout</div>'

        if(currentUser.role === 'ADMIN_ROLE'){

            const adminProductLink = createListItemElement('admin-products', 'Admin Product');

            const adminUserLink = createListItemElement('admin-user', 'Admin Users');
            //const li = document.createElement('li')   //? SI quisieramos que quede bien seria esta linea (ejemplo 1)            

            navbarList.appendChild(adminProductLink) //y ahora lo agregamos al navbar
            navbarList.appendChild(adminUserLink) //y ahora lo agregamos al navbar
        }

    }else{        
        const link = createLinkElement('login', 'Login')
        signIn.replaceChildren(link)
    }
}

function createListItemElement(path, text){
    const listItem = document.createElement('li')
    listItem.classList.add('navbar__nav-item')

    listItem.setAttribute('id', path)
    link = createLinkElement(path,  text) //insertamos dentro del li el adminProductLink y lo mismo con el siguiente

    listItem.appendChild(link)
    return listItem
}


//con la siguiente funcion creamos las rutas de acceso, entonces segun cada cosa que hagamos tendra su pagina
function createLinkElement(path, text, type = null){
    let li;
    const link = document.createElement('a')
    link.classList.add('navbar__nav-link')
    link.href =`/${path}`
    link.innerText = text
    
    return link
}

function logout(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser.role === 'ADMIN_ROLE'){
        document.getElementById('admin-products').remove(); //eliminamos los 2 botones cuando nos deslogueamos de un role admin
        document.getElementById('admin-user').remove(); //eliminamos los 2 botones cuando nos deslogueamos
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')
    sessionStorage.removeItem('order')
    renderHeaderLinks();
    window.location.replace("/");

}

renderHeaderLinks();

