import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
	name: 'myCurrency'
})
export class MyCurrencyPipe extends CurrencyPipe implements PipeTransform {
	transform(
		value: any,
		currencyCode?: string,
		display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
		digitsInfo?: string,
		locale?: string
	): string | null {
		return super.transform(
			value,
			currencyCode || 'ARS',
			display || 'symbol',
			digitsInfo || '1.1-1',
			locale || 'es-AR'
		);
	}
}
