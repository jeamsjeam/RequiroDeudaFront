import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConsumoSoapService } from 'src/app/servicios/consumo-soap.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {
  listaDatos: any;
  bandera: boolean = false;
  numberSearch:string='';
  loading: boolean = false;
  @ViewChild("inputCodigo", { static: false }) codigo: ElementRef | undefined;
  deudaCuota: string = "0";
  saldoCapital: string = "0";
  saldoInteres: string = "0";
  saldoTotal: string = "0";
  message: string = 'loading :(';

 constructor( private consumoSoap: ConsumoSoapService, private cdr: ChangeDetectorRef){
 
 }
 ngOnInit(){

 }

 ngAfterViewInit() {
  this.message = 'all done loading :)'
  this.cdr.detectChanges();
}

 validar(){
  var validar = this.codigo?.nativeElement.value;
  this.numberSearch = this.codigo?.nativeElement.value;
  if(validar !== null && validar !== undefined && validar !==""){
    if(/^[0-9]*$/.test(validar)){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
 }

 fallo(){

 }

 consumo(){
  this.loading = true;
  this.bandera = false;
  var variable = this.codigo?.nativeElement.value;
  this.consumoSoap.getDatos(variable).subscribe((data: any) =>{
    if(data !== null){
      this.bandera = true;
      if(data.Xmldelsdtdeudas === null){
        data.Xmldelsdtdeudas = null
      }
      if(data.Xmldelsdtimportesaingresar === null){
        data.Xmldelsdtimportesaingresar = null
      }
      this.listaDatos = data;
      this.asignarValores();
      this.loading = false;
    }else{
      this.bandera = false;
      this.listaDatos = {};
      this.loading = false;
    }
  } )
 }

 asignarValores(){
  
  this.deudaCuota = (parseFloat(this.listaDatos.Deudacuotsocsinven) + parseFloat(this.listaDatos.Deudacuotsocven)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.saldoCapital = (parseFloat(this.listaDatos.Saldocapitalsinvencer) + parseFloat(this.listaDatos.Saldocapitalvencido)).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.saldoInteres = (parseFloat(this.listaDatos.Saldointeresessinvencer) + parseFloat(this.listaDatos.Saldointeresvencidos)).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.saldoTotal = (parseFloat(this.listaDatos.Saldototalsinvencer) + parseFloat(this.listaDatos.Saldototalvencido)).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.listaDatos.Deudacuotsocven = parseFloat(this.listaDatos.Deudacuotsocven).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.listaDatos.Saldocapitalvencido = parseFloat(this.listaDatos.Saldocapitalvencido).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.listaDatos.Saldointeresvencidos = parseFloat(this.listaDatos.Saldointeresvencidos).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.listaDatos.Saldomora = parseFloat(this.listaDatos.Saldomora).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  this.listaDatos.Saldototalvencido = parseFloat(this.listaDatos.Saldototalvencido).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  }

}
