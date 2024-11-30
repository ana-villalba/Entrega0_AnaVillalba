var express = require('express');
var router = express.Router();
var fs = require('fs');
const jwt = require('jsonwebtoken')

// Devuelve el listado de archivos de un directorio
// (Solo los nombres de los archivos)
function readFolder(FolderPath){
  return new Promise(function(resolve, reject){
      fs.readdir(FolderPath, (err, files) => {
          if (err) {
              reject(error = "Reading Folder failed")
          } else {
              resolve(files)
          }
      })
  })
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', async function(req, res, next) {

  // Armo la ruta del archivo de categorias
  const categoriesFile = 'jsons/cats/cat.json' 
  const categoriesPath = __dirname.replace('routes', categoriesFile)

  // Leo el archivo de categorias
  const categories = await fs.promises
    .readFile(categoriesPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
  // Devuelvo las categorias
  res.send(categories)
})


router.get('/sell/publish', async function(req, res, next) {

  // Armo la ruta del archivo de ventas
  const sellFile = 'jsons/sell/publish.json' 
  const sellPath = __dirname.replace('routes', sellFile)

  // Leo el archivo de ventas
  const sell = await fs.promises
    .readFile(sellPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
 
  res.send(sell)
})
router.get('/cats_products/:id', async function(req, res, next) {
  const id = req.params.id
  // Armo la ruta del archivo de ventas
  const sellFile = `jsons/cats_products/${id}.json`
  const sellPath = __dirname.replace('routes', sellFile)

  // Leo el archivo de ventas
  const sell = await fs.promises
    .readFile(sellPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
 
  res.send(sell)
    
  })

router.get('/cats_products', async function(req, res, next) {

  // Defino la ruta del directorio de cats_products
  const directorioCatProductos = 'jsons/cats_products' 
  const path = __dirname.replace('routes', directorioCatProductos)

  // Obtengo los nombres de los archivos json dentro de cats_products
  const carpetas = await readFolder(path) // ["101.json", "102.json", ...]

  const resultado = []

  // Recorro la lista de jsons
  for (const ruta of carpetas) {
    // Genero la ruta real y leo los contenidos
    const rutaFinal = __dirname.replace('routes', '/jsons/cats_products/' + ruta)
    const categoria = await fs.promises
      .readFile(rutaFinal)
      .then((data) => JSON.parse(data))
      .catch((err) => console.log(err))

    // agrego cada contenido al resultado
    resultado.push(categoria)
  }
  
  res.send(resultado)
})

// endpint que traiga cats_products/${catID}.json


router.get('/products', async function(req, res, next) {

  // Defino la ruta del directorio de products
  const directorioProductos = 'jsons/products' 
  const path = __dirname.replace('routes', directorioProductos)

  // Obtengo los nombres de los archivos json dentro de products
  const carpetas = await readFolder(path) // ["101.json", "102.json", ...]

  const resultado = []

  // Recorro la lista de jsons
  for (const ruta of carpetas) {
    // Genero la ruta real y leo los contenidos
    const rutaFinal = __dirname.replace('routes', '/jsons/products/' + ruta)
    const producto = await fs.promises
      .readFile(rutaFinal)
      .then((data) => JSON.parse(data))
      .catch((err) => console.log(err))

    // agrego cada contenido al resultado
    resultado.push(producto)
  }
  
  res.send(resultado)
})

router.get('/products_comments/:id', async function(req, res, next) {
  const id = req.params.id
  // Armo la ruta del archivo de ventas
  const sellFile = `jsons/products_comments/${id}.json`
  const sellPath = __dirname.replace('routes', sellFile)

  // Leo el archivo de ventas
  const sell = await fs.promises
    .readFile(sellPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
 
  res.send(sell)
    
  })

router.get('/products_comments', async function(req, res, next) {

  // Defino la ruta del directorio de products
  const directorioProductoscomentario = 'jsons/products_comments' 
  const path = __dirname.replace('routes', directorioProductoscomentario)

  // Obtengo los nombres de los archivos json dentro de products
  const carpetas = await readFolder(path) // ["101.json", "102.json", ...]

  const resultado = []

  // Recorro la lista de jsons
  for (const ruta of carpetas) {
    // Genero la ruta real y leo los contenidos
    const rutaFinal = __dirname.replace('routes', '/jsons/products_comments/' + ruta)
    const comentarioproducto = await fs.promises
      .readFile(rutaFinal)
      .then((data) => JSON.parse(data))
      .catch((err) => console.log(err))

    // agrego cada contenido al resultado
    resultado.push(comentarioproducto)
  }
  
  res.send(resultado)
})

router.get('/cart/buy', async function(req, res, next) {

  // Armo la ruta del archivo de carrito
  const cartFile = 'jsons/cart/buy.json' 
  const cartPath = __dirname.replace('routes', cartFile)

  // Leo el archivo de carrito
  const cart = await fs.promises
    .readFile(cartPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
  
  res.send(cart)
})

router.get('/user_cart/25801', async function(req, res, next) {

  // Armo la ruta del archivo de usuario de carrito
  const usercartFile = 'jsons/user_cart/25801.json' 
  const usercartPath = __dirname.replace('routes', usercartFile)

  // Leo el archivo de usuario de carrito
  const usercart = await fs.promises
    .readFile(usercartPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
  
  
  res.send(usercart)
})




module.exports = router;