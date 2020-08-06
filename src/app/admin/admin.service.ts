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
        const url: any = `${environment.adminServices}/dashboard`;
        return this.http.get(url, { responseType: 'text' }).pipe(
            map(response => {
                console.log('response', response);
                return response;
            })
        );
    }

    getTechnology(): Observable<any> {
        const url: any = `${environment.adminServices}/courses`;
        return this.http.get(url).pipe(
            map(response => {
                console.log('response', response);
                return response;
            })
        );
    }

    getUsers(): Observable<any> {
        const url: any = `${environment.adminServices}/users`;
        return this.http.get(url).pipe(
            map(response => {
                console.log('response', response);
                return response;
            })
        );
    }

    getMentors(): Observable<any> {
        const url: any = `${environment.adminServices}/mentors`;
        return this.http.get(url).pipe(
            map(response => {
                console.log('response', response);
                return response;
            })
        );
    }

    deleteUser(id: string): Observable<any> {
        const url: any = `${environment.adminServices}/user/delete/` + id;
        return this.http.get(url).pipe(
            map(response => {
                return response;
            })
        );
    }

    deleteTechnology(id: string): Observable<any> {
        const url: any = `${environment.adminServices}/course/delete/` + id;
        return this.http.get(url).pipe(
            map(response => {
                return response;
            })
        );
    }
}
