import { Resource } from './resource';

export class Equipo extends Resource {
	descripcion: string;
	rubro: string;
	rubroDesc?: string;
	observaciones?: string;
	imagenes?: string[];
}
