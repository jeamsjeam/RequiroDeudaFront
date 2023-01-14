import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsumoSoapService {

  
  headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor( private http: HttpClient) { }
  getDatos(objeto: string){
    let url = "http://192.168.89.8:1315/api/Soap?codigo="+objeto
    return this.http.get(url)
  }
}
