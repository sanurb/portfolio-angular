import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  cargando = true;
  productos: product[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    this.http.get('https://angular-portfolio-52398-default-rtdb.firebaseio.com/product_idx.json')
      .subscribe( (resp: any) => {

        console.log(resp);
        this.productos = resp;
        this.cargando = false;

        // setTimeout(() => {
        //   this.cargando = false;
        // }, 1800);

      });

  }

}
