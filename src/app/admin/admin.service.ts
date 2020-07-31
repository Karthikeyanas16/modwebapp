import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient, private route: Router) { }

    welcome(): Observable<any> {
        const url: any = `${environment.url}/greeting`;
        return this.http.get(url, { responseType: 'text' }).pipe(
            map(response => {
                console.log('response', response);
                return response;
            })
        );
    }
}
