import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {

      this.cargarInfo();
      this.cargarEquipo();

  }

  private cargarInfo() {
    // Read json file
    this.http.get('assets/data/data-page.json')
    .subscribe( (resp: InfoPage) => {

      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-portfolio-52398-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {

      this.equipo = resp;
      // console.log( resp );
    });
  }

}
