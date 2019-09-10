export interface Cliente {
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
	_id?: string;
}
