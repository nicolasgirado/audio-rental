export interface Equipo {
	descripcion: string;
	rubro: string;
	observaciones?: string;
	imagenes: string[];
	precios?: [
		{
			lugar: string;
			anio: number;
			semestre: number;
			precio: number;
			_id?: string;
		}
	];
	_id?: string;
}
