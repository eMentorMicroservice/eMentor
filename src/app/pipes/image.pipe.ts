import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string) {
      if (!value || value === '') {
        value = './assets/images/no-image.jpg';
      }
    return value;
  }
}
