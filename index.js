require('dotenv').config(); //esta linea nos permite leer nuestras varables de entorno
const app = require('./app'); //siempre hay que especificar que desde donde se encuentra el index tenga que buscar y nunca se le pone la extension

const port = process.env.PORT; //definimos nuestro puerto
const DB_URL = process.env.MONGODB_CONNECTION;
// const dbURL = `mongodb+srv://matubil:<password>@matias-cluster.jaqxolj.mongodb.net/ACA PODRIAMOS INSERTAR EL NOMBRE DE LA DB QUE QUISIERAMOS QUE LE PONGA O TABLA?retryWrites=true&w=majority`;

const mongoose = require('mongoose') //llamamos a la libreria

async function dbConnect(){
    
        mongoose.set('strictQuery', false)

        await mongoose.connect(DB_URL)

        console.log(`\x1b[35m Conexion a la MONGODB satisfactoria \x1b[37m`); //fijarse de poner siempre que al final de la linea poner \x1b[37m para que despues veulva al color blanco asi no imprime todo en la consola de mil colores
                            
                            

        //Poner en marcha mi servidor express
        app.listen(port, ()=>{  //tomar nota de esto, en la hora 1:50 -2:06 maso de la clase
            console.log(`\x1b[36m Servidor funcionando en puerto: ${port} \x1b[37m`)
    }) 
}

dbConnect().catch(error => console.error(`Error al conectar con la DB`, error));


// mongoose.connect(DB_URL)
//                     .then(() =>{  //nos da la posibilidad de conectarnos a mongo
//                         console.log(`\x1b[35m Conexion a la MONGODB satisfactoria \x1b[37m`); //fijarse de poner siempre que al final de la linea poner \x1b[37m para que despues veulva al color blanco asi no imprime todo en la consola de mil colores
                        
                        

//                         //Poner en marcha mi servidor express
//                         app.listen(port, ()=>{  //tomar nota de esto, en la hora 1:50 -2:06 maso de la clase
//                             console.log(`\x1b[36m Servidor funcionando en puerto: ${port} \x1b[37m`)
//                         }) 

//                     }).catch(function(error){ //podemos usar una funcion de flecha tambien y que quede (error)=>, funcion de    callback
//                         console.log(error)
//                     })


