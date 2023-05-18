
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestSearch } from '../models/request-search.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }
  obtenerTodosFiltrando(search:RequestSearch): Observable<any> {
    return this.http.post(this.baseUrl+'/paginado',search);
  }
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }

  modificar(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}`, producto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
// Descarcar Documento
public descargarFile(id: any) {
  const url = `${this.baseUrl}/ficheroAnexo`;
  this.descargarDocumento(url, id);
}

  public descargarDocumento(url: string, id: string ) {
  const a = document.createElement('a');
  a.href = `${url}/${id}`;
  a.download = id;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

}
