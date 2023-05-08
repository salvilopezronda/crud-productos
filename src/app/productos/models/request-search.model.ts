export class RequestSearch {
    sort: string;
    page: number;
    size: number;
    nombre: string;
    constructor(data?) {
        this.sort = data && data.sort || '';
        this.page = data && data.page || null;
        this.size = data && data.size || null;
        this.nombre = data && data.nombre || '';
    }
    public toService() {
        const obj: any = new Object;
        obj.sort = this.sort;
        obj.page = this.page;
        obj.size = this.size;
        obj.nombre = this.nombre;
        return obj;
    }
}