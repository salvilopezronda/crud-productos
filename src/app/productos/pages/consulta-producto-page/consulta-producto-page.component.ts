import { Component, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../service/productos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestSearch } from '../../models/request-search.model';

@Component({
  selector: 'app-consulta-producto-page',
  templateUrl: './consulta-producto-page.component.html',
  styleUrls: ['./consulta-producto-page.component.scss']
})
export class ConsultaProductoPageComponent implements OnInit, OnDestroy {

  public listaProductos: Array<Producto> = new Array<Producto>();
  public suscripciones: Subscription = new Subscription();
  public modoEditar:boolean=false;
  public modoPaginado:boolean=false;
  public size:number;
  public page:number;
  public sort:string;
  public elementosTotales:number;
  formulario: FormGroup
  constructor(
    private service: ProductosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
    });
  }




  crearProducto() {
    console.log(this.formulario.value);
  }
  ngOnInit(): void {
 //   this.obtenerTodos();
 this.obtenerTodosFiltrando();
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
  public cancelar(){
    this.formulario.get('id').setValue(null);
    this.formulario.get('nombre').setValue('');
    this.formulario.get('descripcion').setValue('');
    this.formulario.get('precio').setValue(null);
    this.modoEditar=false;
  }
  public cargarProductoParaModificar(producto:Producto){
    this.formulario.get('id').setValue(producto.id);
    this.formulario.get('nombre').setValue(producto.nombre);
    this.formulario.get('descripcion').setValue(producto.descripcion);
    this.formulario.get('precio').setValue(producto.precio);
    this.modoEditar=true;
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

  public obtenerTodosFiltrando() {
    this.modoPaginado=true;
    const search:RequestSearch = new RequestSearch();
    search.page=0;
    search.size=100;
    search.sort='nombre'
    search.nombre='a'
    const sub = this.service.obtenerTodosFiltrando(search).subscribe(
      (resultado) => {
        this.page=search.page;
        this.size=search.size;
        this.sort=search.sort;
        this.elementosTotales=resultado.totalElements;
        this.listaProductos = resultado.content;
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
