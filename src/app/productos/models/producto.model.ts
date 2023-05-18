export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    nombreArchivo: string;
    archivo:any;
    constructor(data?) {
        this.id = data && data.id || null;
        this.nombre = data && data.nombre || null;
        this.descripcion = data && data.descripcion || null;
        this.precio = data && data.precio || null;
        this.nombreArchivo = data && data.nombreArchivo || null;
        this.archivo = data && data.archivo || null;
    }
    public toService() {
        const obj: any = new Object;
        obj.id = this.id;
        obj.nombre = this.nombre;
        obj.descripcion = this.descripcion;
        obj.precio = this.precio;
        obj.nombreArchivo = this.nombreArchivo;
        obj.archivo = this.archivo;
        return obj;
    }
}