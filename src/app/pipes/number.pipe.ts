import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appNumber',
})
export class AppNumberPipe implements PipeTransform {
    transform(value: number) {
        if (value !== undefined && value !== null) {
            return value.toLocaleString();
        } else {
            return '';
        }
    }
}