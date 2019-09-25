import { Resource } from './resource';

export class Usuario extends Resource {
	nombre: string;
	email: string;
	role: string;
	password?: string;
	avatar?: string;
}
