const contenedor = document.getElementById("container-productos")


function mostrarVinos(){
    contenedor.innerHTML = "" //para que cuando se se muestran los vinos (para cuando se actualice el carrito), se borre todo lo que veiamos antes
    const productos = JSON.parse(localStorage.getItem("Vinos"))
    console.log(productos)
    if (productos && productos.length > 0) { // me aseguro que haya algún producto en el carrito antes de que pase lo siguiente.
        productos.forEach((producto)=>{
            const nuevoVino = document.createElement("div")
            nuevoVino.classList ="card2"
            nuevoVino.innerHTML += `
                <img src=${producto.imagen}>
                    <h2>${producto.nombre}</h2>
                    <p>${producto.precio}</p>
                    <div>
                        <button>-</button>
                        <span class="cantidad">${producto.cantidad}</span>
                        <button>+</button>
                    </div>
                `
            contenedor.appendChild(nuevoVino)
            nuevoVino.getElementsByTagName('button')[1].addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText = agregarAlCarrito (producto)
            
            })
            nuevoVino.getElementsByTagName('button')[0].addEventListener("click", ()=> {
                restarAlCarrito(producto)
                mostrarVinos()

            })
            
        })
    }
    actualizarNumeroCarrito()
}

// Agregar al Carrito

function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem('Vinos'))|| [] // convierto el string en array
    console.log(memoria)
    let cuenta = 0
    if(!memoria){
        // Si no hay productos en el carrito, agregamos el primero
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem('Vinos', JSON.stringify(nuevoProducto)) // convierto el array en string
        cuenta = 1
    } else{
        // Si ya hay productos en el carrito, actualizamos la cantidad o agregamos uno nuevo
        const indiceProducto = memoria.findIndex(vino => vino.id === producto.id)
        console.log(indiceProducto)
        const nuevaMemoria = memoria
        
        if(indiceProducto === -1){ // Si no lo encuentra en la memoria
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1
        }else{ //si ya existe el producto
            nuevaMemoria[indiceProducto].cantidad ++
            cuenta = nuevaMemoria [indiceProducto].cantidad
        }
        localStorage.setItem('Vinos', JSON.stringify(nuevaMemoria))
        return cuenta
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


function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem('Vinos'))
    const indiceProducto = memoria.findIndex(vino => vino.id === producto.id)
    if(memoria[indiceProducto].cantidad ===1){
        memoria.splice(indiceProducto,1)
    } else{
        memoria[indiceProducto].cantidad --;
    }
    localStorage.setItem("Vinos", JSON.stringify(memoria))
    actualizarNumeroCarrito()
}


mostrarVinos()
actualizarNumeroCarrito()



