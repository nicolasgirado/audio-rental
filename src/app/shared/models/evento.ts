import { Resource } from './resource';

export class Evento extends Resource {
	nombre: string;
	tipoDeEvento: string;
	cliente: string;
	lugar: string;
	salon: string;
	fechaEvento: Date;
	fechaArmado?: Date;
	fechaDevolucion?: Date;
	promoViernes?: boolean;
	dj?: string;
	responsable?: string;
	valorPack: number;
	totalSubtotal: number;
	totalPcioVtaDJ: number;
}
