export class Evento {
	constructor(
		public lugar: string,
		public salon: string,
		public fechaEvento: Date,
		public precioPack: number,
		// tslint:disable-next-line: variable-name
		public _id?: string
	) {}
}
