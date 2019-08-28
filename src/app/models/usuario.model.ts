export class Usuario {
	constructor(
		public nombre: string,
		public email: string,
		public password: string,
		public role?: string,
		public avatar?: string,
		public _id?: string
	) {}
}
