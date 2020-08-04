import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient, private route: Router) { }

    geAllCourses(): Observable<any> {
        const url: any = `${environment.searchCourses}/courses`;
        return this.http.get(url).pipe(
            map(response => {
                return response;
            })
        );
    }

}
