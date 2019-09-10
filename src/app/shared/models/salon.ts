export interface Salon {
	nombre: string;
	lugar: string;
	imagenes?: string[];
	packs?: [
		{
			mesanio: string;
			quincena: number;
			valorPack: number;
		}
	];
	_id?: string;
}
