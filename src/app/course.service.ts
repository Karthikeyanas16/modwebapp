import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    courses: Subject<any> = new Subject<any>();
    constructor(private http: HttpClient, private route: Router) { }

    geAllCourses(): Observable<any> {
        const url: any = `${environment.searchCourses}/courses`;
        return this.http.get(url).pipe(
            map(response => {
                this.courses.next(response);
                return response;
            })
        );
    }
    searchCourse(text: string): Observable<any> {
        const url: any = `${environment.searchCourses}/mentorTechnology/` + text;
        return this.http.get(url).pipe(
            map(response => {
                if (response) {
                    this.courses.next(response);
                }
                return response;
            })
        );
    }

}
