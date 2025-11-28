const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializaciones 
const app = express();

// Configuracion del puerto que vamos a utilizar
app.set('port', process.env.PORT || 3000);

// Esta es la configuracion de las vistas de handlebars
app.set('views', path.join(__dirname, 'views')); // Le estamos diciendo donde esta la carpeta views

// Configuración de hanlde bars
app.engine("handlebars", exphbs.engine()) // Esto es decirle que vamos a utilizar este motor, el motor handlebars

// Cuando ya has dicho el motor mencionas las vistas
app.set("view engine", "handlebars")

// Mencionamos a los archivos del public : css, Imagenes ...
app.use(express.static("public"))

// Importamos las rutas desde la carpeta routes, porque es una buena practica
app.use(require('./routes/index')); 

// app.use('/admin', require('./routes/admin')); // Futura ruta para gestionar 

// Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('>>> Servidor corriendo en puerto', app.get('port'));
});


