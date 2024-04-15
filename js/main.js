class Vino {
    constructor(id, nombre, precio, imagen, categoria) {
        this.id = id
        this.nombre = nombre
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria; 
    }
}

const Vinos = [
    new Vino ("1", "Vino Tinto Rutini Malbec", "$14.000","https://www.espaciovino.com.ar/media/default/0001/62/thumb_61998_default_medium.jpeg", "Vino Tinto" ),
    new Vino ("2", "Saint Felicien Malbec", "$10.000", "https://www.espaciovino.com.ar/media/default/0001/62/thumb_61249_default_small.jpeg", "Vino Tinto"),
    new Vino ("3", "DV Catena Malbec", "$24.000", "https://www.espaciovino.com.ar/media/default/0001/53/thumb_52813_default_small.jpeg", "Vino Tinto"),
    new Vino ("4", "Chateau Vieux Gran Reserva Chardonnay", "$16.000", "https://www.espaciovino.com.ar/media/default/0001/68/thumb_67595_default_small.jpeg", "Vino Blanco"),
    new Vino ("5", "Goyenechea Merlot Rosé", "$7.000", "https://www.espaciovino.com.ar/media/default/0001/58/thumb_57357_default_small.jpeg", "Vino Rosado"),
    new Vino ("6", "La Linda Cabernet Sauvignon", "$12.000", "https://www.espaciovino.com.ar/media/default/0001/67/thumb_66916_default_small.jpeg", "Vino Tinto"),
    new Vino ("7", "Nieto Senetiner Chardonnay", "$8.000", "https://www.espaciovino.com.ar/media/default/0001/63/thumb_62396_default_small.jpeg", "Vino Blanco"),
    new Vino ("8", "Angelica Zapata Chardonnay", "$28.000", "https://www.espaciovino.com.ar/media/default/0001/54/thumb_53059_default_small.jpeg", "Vino Blanco"),
    new Vino ("9", "Telteca Tierra Malbec Rosé", "$8.000", "https://www.espaciovino.com.ar/media/default/0001/66/thumb_65292_default_small.jpeg", "Vino Rosado"),
    new Vino ("10", "Luigi Bosca Brut Nature", "$25.000", "https://www.espaciovino.com.ar/media/default/0001/54/thumb_53474_default_small.jpeg", "Vino Espumoso"),
    new Vino ("11", "Salentein Brut Rosé", "$10.000", "https://www.espaciovino.com.ar/media/default/0001/54/thumb_53626_default_small.jpeg", "Vino Espumoso"),
    new Vino ("12", "Domaine Bousquet Champenoise Rosé", "$28.000", "https://www.espaciovino.com.ar/media/default/0001/62/thumb_61782_default_small.jpeg", "Vino Espumoso"),

]

const contenedor = document.getElementById("container-productos")

function mostrarVinos(productos){
    productos.forEach((producto)=>{
        const nuevoVino = document.createElement("div")
        nuevoVino.classList ="card"
        nuevoVino.innerHTML += `
            <img src=${producto.imagen}>
            <div class="texto-boton">
                <h2>${producto.nombre}</h2>
                <p>${producto.precio}</p>
                <button>Agregar al carrito</button>
            </div>
            `
        contenedor.appendChild(nuevoVino)
        nuevoVino.getElementsByTagName('button')[0].addEventListener("click", ()=> agregarAlCarrito(producto))
        
    })
}


// Agregar al Carrito

function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem('Vinos'))|| [] // convierto el string en array
    console.log(memoria)
    if(!memoria){
        // Si no hay productos en el carrito, agregamos el primero
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem('Vinos', JSON.stringify(nuevoProducto)) // convierto el array en string
    } else{
        // Si ya hay productos en el carrito, actualizamos la cantidad o agregamos uno nuevo
        const indiceProducto = memoria.findIndex(vino => vino.id === producto.id)
        console.log(indiceProducto)
        const nuevaMemoria = memoria
        
        if(indiceProducto === -1){ // Si no lo encuentra en la memoria
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
        }else{ //si ya existe el producto
            nuevaMemoria[indiceProducto].cantidad ++
        }
        localStorage.setItem('Vinos', JSON.stringify(nuevaMemoria))
    }
    actualizarNumeroCarrito()
}

// Toma un producto, le agrega cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1
    return nuevoProducto
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito")
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem('Vinos'))
    const cuenta = memoria.reduce((acumulador, valorDelArray)=> acumulador + valorDelArray.cantidad, 0)
    cuentaCarritoElement.innerText = cuenta
}

mostrarVinos(Vinos)

actualizarNumeroCarrito()







