export class Evento {
	constructor(
		public lugar: string,
		public salon: string,
		public fechaEvento: Date,
		public precioPack: number,
		public _id?: string
	) {}
}
