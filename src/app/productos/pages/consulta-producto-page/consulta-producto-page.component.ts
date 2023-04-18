import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../service/productos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-producto-page',
  templateUrl: './consulta-producto-page.component.html',
  styleUrls: ['./consulta-producto-page.component.scss']
})
export class ConsultaProductoPageComponent implements OnInit, OnDestroy {

  public listaProductos: Array<Producto> = new Array<Producto>();
  public suscripciones: Subscription = new Subscription();
  public modoEditar:false;
  formulario: FormGroup
  constructor(
    private service: ProductosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }




  crearProducto() {
    console.log(this.formulario.value);
  }
  ngOnInit(): void {
    this.obtenerTodos();
  }

  public eliminarProducto(id:number) {
    console.log(id)
    const sub = this.service.eliminar(id).subscribe(
      () => {
        this.obtenerTodos();
      },
      (error) => {
        console.log(error)
        alert("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)
  }
  public modificarProducto() {
    /*const sub = this.service.obtenerTodos().subscribe(
      (resultado) => {
        this.listaProductos = resultado;
      },
      (error) => {
        console.log(error)
        alert("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)*/
  }

  public obtenerTodos() {
    const sub = this.service.obtenerTodos().subscribe(
      (resultado) => {
        this.listaProductos = resultado;
      },
      (error) => {
        console.log(error)
        alert("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)
  }
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
  }
}
