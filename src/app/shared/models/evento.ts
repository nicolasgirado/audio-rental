export interface Evento {
	nombre: string;
	tipoDeEvento: string;
	cliente: string;
	salon: string;
	fechaHoraEvento: Date;
	promoViernes: boolean;
	valorPack: number;
	totalAdicionales: number;
	fechaHoraArmado?: Date;
	fechaHoraDevolucion?: Date;
	DJ?: string;
	responsable?: string;
	adicionales?: [
		{
			cantidad?: number;
			equipo?: string;
			observaciones?: string;
			pcioUnit?: number;
			subtotal?: number;
			pcioVtaDJ?: number;
		}
	];
	_id?: string;
}
