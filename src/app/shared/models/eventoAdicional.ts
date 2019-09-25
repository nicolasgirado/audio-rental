import { Resource } from './resource';

export class EventoAdicional extends Resource {
	evento: string;
	cantidad: number;
	equipo: string;
	observaciones?: string;
	pcioUnit: number;
	subtotal: number;
	pcioVtaDJ: number;
	markUp: number;
}
