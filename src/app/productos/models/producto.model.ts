export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    constructor(data?) {
        this.id = data && data.id || null;
        this.nombre = data && data.nombre || '';
        this.descripcion = data && data.descripcion || '';
        this.precio = data && data.precio || null;
    }
    public toService() {
        const obj: any = new Object;
        obj.id = this.id;
        obj.nombre = this.nombre;
        obj.descripcion = this.descripcion;
        obj.precio = this.precio;
        return obj;
    }
}