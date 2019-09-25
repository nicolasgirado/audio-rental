import { Resource } from './resource';

export class Cliente extends Resource {
	razonSocial: string;
	direccion: string;
	contactos?: [
		{
			nombre: string;
			telefono?: string;
			email?: string;
		}
	];
	telefonos?: string[];
	email?: string;
}
