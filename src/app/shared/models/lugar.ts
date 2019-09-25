import { Resource } from './resource';

export class Lugar extends Resource {
	nombre: string;
	direccion: string;
	contacto?: string;
	telefonos?: string[];
	email?: string;
	imagenes?: string[];
}
