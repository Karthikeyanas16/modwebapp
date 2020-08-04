import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'newline' })
export class NewlinePipe implements PipeTransform {
    transform(value: string, limit = 60, completeWords = false, ellipsis = '...') {
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }
}
