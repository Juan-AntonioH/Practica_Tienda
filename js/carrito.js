class Carrito {

	constructor(id) {
		this.id = id;
		this.articulos = [];
	}

	anyadeArticulo(articulo) {
		let posArticulo = this.articulos.findIndex(e => e.codigo == articulo.codigo);
		if (posArticulo == -1) {
			articulo.unidades = 1;
			this.articulos.push(articulo)
		} else {
			this.articulos[posArticulo].unidades++
		}
	}

	borraArticulo(codigo) {
		let posArticulo = this.articulos.findIndex(e => e.codigo == codigo);
		this.articulos.splice(posArticulo, 1);

	}

	modificaUnidades(codigo, n) {
		let posArticulo = this.articulos.findIndex(e => e.codigo == codigo);
		(n == "+") ? this.articulos[posArticulo].unidades++ : this.articulos[posArticulo].unidades--;
		(this.articulos[posArticulo].unidades == 0) ? this.articulos.splice(posArticulo, 1) : "";
		
	}

	verCarrito() {
		let tablaDialog = "<table class='table table-striped'><tr><th><th>nombre<th>descripcion<th>precio<th>unidades<th>total<td></tr>"
		let suma = 0;

		this.articulos.forEach(e => {
			tablaDialog += `
			<tr>
			<td><img src="assets/${e.codigo}.jpg" class="imagen">
			<td>${e.nombre}
			<td>${e.descripcion}
			<td>${e.precio}
			<td>${e.unidades}
			<td>${e.precio * e.unidades}
			<td><button id="${e.codigo}_+" class="btn btn-primary">+</button> 
			<button id="${e.codigo}_-" class="btn btn-warning">-</button> 
			<button id="${e.codigo}_borrar" class="btn btn-danger">borrar</button>
			</tr>`
			suma += e.precio * e.unidades;
		})

		tablaDialog += "</table>"

		document.getElementById("dialogContent").innerHTML = tablaDialog;
		document.getElementById("idPedido").innerHTML = this.id;
		document.getElementById("total").innerHTML = "<b>" + suma + "€</b>";

		this.articulos.forEach(e => {
			document.getElementById(e.codigo + "_+").onclick = () => { this.modificaUnidades(e.codigo, "+"), this.verCarrito() }
			document.getElementById(e.codigo + "_-").onclick = () => { this.modificaUnidades(e.codigo, "-"), this.verCarrito() }
			document.getElementById(e.codigo + "_borrar").onclick = () => { this.borraArticulo(e.codigo,), this.verCarrito() }
		})
	}
}
