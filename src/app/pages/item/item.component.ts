import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDescription } from 'src/app/interfaces/product.description.interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  cargandoItem = true;
  product: ProductDescription;
  id: String;

  constructor(  private route: ActivatedRoute,
                public productsService: ProductsService ) { }

  ngOnInit() {

      this.route.params
          .subscribe( parametros => {
            // console.log( parametros['id']);
            this.productsService.getProduct(parametros['id'])
                .subscribe( (product: ProductDescription) => {
                  this.id = parametros['id'];
                  this.product = product;
                  this.cargandoItem = false;
                });

          });

  }

}
