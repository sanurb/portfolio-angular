import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  cargando = true;
  productos: product[] = [];
  productosFiltrados: product[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise<void>( ( resolve, reject ) => {

      this.http.get('https://angular-portfolio-52398-default-rtdb.firebaseio.com/product_idx.json')
        .subscribe( (resp: any) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });
  }

  getProduct( id: String ) {
    return this.http.get(`https://angular-portfolio-52398-default-rtdb.firebaseio.com/product/${ id }.json`);
  }

  buscarProducto(termino:string){
    if (this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then( ()=>{
        // ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
        });
    } else {
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string ){

    console.log(this.productos);
    this.productosFiltrados = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod =>{

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0|| tituloLower.indexOf( termino ) >= 0) {
          this.productosFiltrados.push( prod );
      }

    })

  }

}
