
import { Producto } from '../../models/producto.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../service/productos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestSearch } from '../../models/request-search.model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponentComponent } from '../../components/modal-component/modal-component.component';


@Component({
  selector: 'app-consulta-producto-page',
  templateUrl: './consulta-producto-page.component.html',
  styleUrls: ['./consulta-producto-page.component.scss']
})
export class ConsultaProductoPageComponent implements OnInit, OnDestroy {

  public listaProductos: Array<Producto> = new Array<Producto>();
  public suscripciones: Subscription = new Subscription();
  public modoEditar: boolean = false;
  public modoPaginado: boolean = false;
  public size: number;
  public page: number;
  public sort: string;
  ficheroAdjunto:boolean= false;
  isHovered: boolean = false;
  seleccionado: boolean = false;
  public elementosTotales: number;
  formulario: FormGroup
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(
    private service: ProductosService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formulario = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      nombreArchivo: [null, Validators.required],
      archivo: [null, Validators.required],
    });
  }



  crearProducto() {
    console.log(this.formulario.value);
  }
  ngOnInit(): void {
    this.obtenerTodosFiltrando();
    
  }

  public eliminarProducto(id: number) {
    const sub = this.service.eliminar(id).subscribe(
      () => {
        this.obtenerTodos();
      },
      (error) => {
        console.log("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)
  }
  public cancelar() {
    this.ngOnInit();
  }
  public cargarProductoParaModificar(producto: Producto) {
    if (this.modoEditar) {
      this.ficheroAdjunto=false;
      this.cancelar();
      this.modoEditar = false
    } else {
      this.formulario.get('id').setValue(producto.id);
      this.formulario.get('nombre').setValue(producto.nombre);
      this.formulario.get('descripcion').setValue(producto.descripcion);
      this.formulario.get('precio').setValue(producto.precio);
      this.formulario.get('nombreArchivo').setValue(producto.nombreArchivo)
      this.formulario.get('archivo').setValue(producto.archivo)
      this.modoEditar = true;
      if (producto.nombreArchivo != null && producto.nombreArchivo != undefined && producto.nombreArchivo !== '') {
        this.ficheroAdjunto=true;
      }
      this.formulario.get('nombreArchivo').setValidators(null);
      this.formulario.get('nombreArchivo').updateValueAndValidity();
      this.formulario.get('archivo').setValidators(null);
      this.formulario.get('archivo').updateValueAndValidity();
    }

  }

  public obtenerTodos() {
    const sub = this.service.obtenerTodos().subscribe(
      (resultado) => {
        this.listaProductos = resultado;
      },
      (error) => {
        console.log("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)
  }

  public obtenerTodosFiltrando() {
    this.modoPaginado = true;
    const search: RequestSearch = new RequestSearch();
    search.page = 0;
    search.size = 100;
    search.sort = 'nombre'
    const sub = this.service.obtenerTodosFiltrando(search).subscribe(
      (resultado) => {
        this.page = search.page;
        this.size = search.size;
        this.sort = search.sort;
        this.elementosTotales = resultado.totalElements;
        this.listaProductos = resultado.content;
      },
      (error) => {
        console.log("CODE - " + error.status + "/ Mensaje - " + error.message)
      }
    );
    this.suscripciones.add(sub)
  }
  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
  }




  // SELECCIONAR Y ANEXAR ARCHIVO
  public fileNameChanged(ele, fichero, nombreFichero): void {
    const ficheros = ele.currentTarget.files;
    const numeroFicheros = ficheros.length;
    if (numeroFicheros > 0) {
      const reader: FileReader = new FileReader();
      reader.onloadend = (e) => this.gestionarFicheroLeido(reader, fichero);
      if (ficheros[0].size > 0) {
        reader.readAsDataURL(ficheros[0]);
        this.formulario.controls[nombreFichero].setValue(ficheros[0].name);
        this.ficheroAdjunto=true;
      }

    }
  }

  private gestionarFicheroLeido(reader: FileReader, fichero): void {
    const splitReader = reader.result.toString().split('base64,');
    this.formulario.controls[fichero].setValue(splitReader[1]);
  }
  // Botones visualizar y eliminar solo visibles cuando hay un archivo anexo
  // Descargar fichero anexado
  // Si se anexa un fichero será ese el que se descargue, de lo contrario si no se anexa ningún fichero y en
  // BBDD existe uno, será ese el que se descargue.
  public descargarFile(id,nombreArchivo): void {
    console.log(nombreArchivo)
 if (nombreArchivo != null && nombreArchivo != undefined && nombreArchivo !== '') { 
      this.service.descargarFile(id);
    }else {
      console.log("Error al visualizar el archivo")
    }
  }

  // Eliminar fichero anexado
  public eliminarFile(): void {
    this.inputFile.nativeElement.value = "";
    this.formulario.controls['archivo'].setValue(null);
    this.formulario.controls['nombreArchivo'].setValue('');
    this.ficheroAdjunto=false;
  }

  public modificar() {
    const productoParaModificar = new Producto(this.formulario.getRawValue());
    const sub = this.service.modificar(productoParaModificar).subscribe(
      () => {

        this.modoEditar=false;
        this.cancelar();
        this.obtenerTodos();
        console.log("Producto modificado correctamente")
      },
      ({ error, status }) => {
        console.log(error)
      }
    );
    this.suscripciones.add(sub);
  }
  /*mostrarAlerta(mensaje:string) {
    const modalRef = this.modalService.open(ModalComponentComponent);
      modalRef.componentInstance.mensaje = mensaje;
  }*/

}
