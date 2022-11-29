let carro = new Carrito(Math.floor(Math.random() * 100) + 1);
criterios = ["Sin ordenar", "Ascendente por precio", "Descendente por precio"]

function creaListaCriterios() {
	let select = document.getElementById("criteriosOrdenacion");
	criterios.forEach(element => {
		let btn = document.createElement("option");
		btn.value = element;
		btn.text = element;
		select.appendChild(btn);
	});

	select.onchange = () => pintaArticulos(select.value);
	pintaArticulos();
}

function pintaArticulos(orden) {
	let boxArticulos = document.getElementById('contenedor');
	boxArticulos.innerHTML = "";
	let lista = [...listaArticulos];
	// let lista = [].concat(listaArticulos);
	(orden == 'Ascendente por precio') ? lista.sort((a, b) => a.precio - b.precio) : (orden == 'Descendente por precio') ? lista.sort((a, b) => b.precio - a.precio) : "";
	lista.forEach(a => {
		boxArticulos.innerHTML += `
		<div class = "col">
			<div class="card">
				<img src="assets/${a.codigo}.jpg" class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">${a.nombre}</h5>
					<p class="card-text">${a.descripcion}</p>
					<b>
						<p class="card-text text-center">${a.precio}</p>
					</b>
				</div>
				<button id="${a.codigo}" class="btn-success">comprar</button>
			</div>
		</div>`;
	})
	lista.forEach(e => {
		let string = e.codigo;
		document.getElementById(string).addEventListener("click", ponArticuloEnCarrito);
	})

}

function ponArticuloEnCarrito() {
	let producto = listaArticulos.find(e => e.codigo == this.id);
	carro.anyadeArticulo(producto);

}

function verCarro() {
	if (carro.articulos.length == 0) {
		alert("El carrito esta vacio")
	} else {
		carro.verCarrito();
		document.getElementById("miDialogo").showModal();
	}
}

function efectuaPedido() {
	console.log(JSON.stringify(carro))
	document.getElementById("miDialogo").close();
	carro.articulos.splice(0);
	alert("El pedido fue enviado al servidor")
}

window.onload = () => {
	creaListaCriterios();
	document.getElementById("btnEfectuaPedido").addEventListener("click", efectuaPedido);
	document.getElementById("btnCierraDialog").onclick = () => document.getElementById("miDialogo").close()
	document.getElementById("carrito").addEventListener("click", verCarro);
}

