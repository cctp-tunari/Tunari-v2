import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface Course {
  name: string;
  persons: string[]; // Assuming persons are referenced by name or ID
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly baseUrl = 'https://tunari-65fdc-default-rtdb.firebaseio.com/Courses';

  constructor(private http: HttpClient) {}

  addCourse(course: Course): Observable<any> {
    const url = `${this.baseUrl}.json`;
    return this.http.post(url, course);
  }

  getAllCourses(): Observable<Record<string, Course>> {
    return this.http.get<Record<string, Course>>(`${this.baseUrl}.json`);
  }

  getCourseByName(name: string): Observable<Course | null> {
    const url = `${this.baseUrl}/${name}.json`;
    return this.http.get<Course>(url);
  }

  updateCourse(name: string, updatedData: Partial<Course>): Observable<any> {
    const url = `${this.baseUrl}/${name}.json`;
    return this.http.put(url, updatedData);
  }

  deleteCourse(name: string): Observable<any> {
    const url = `${this.baseUrl}/${name}.json`;
    return this.http.delete(url);
  }

  // Add a person to a course
  addPersonToCourse(courseName: string, personId: string): Observable<any> {
    return this.getCourseByName(courseName).pipe(
      mergeMap(course => {
        if (course) {
          const updatedPersons = course.persons ? [...course.persons, personId] : [personId];
          return this.updateCourse(courseName, { persons: updatedPersons });
        }
        return this.createCourseWithPerson(courseName, personId);
      })
    );
  }

  // Remove a person from a course
  removePersonFromCourse(courseName: string, personId: string): Observable<any> {
    return this.getCourseByName(courseName).pipe(
      mergeMap(course => {
        if (course && course.persons) {
          const updatedPersons = course.persons.filter(id => id !== personId);
          return this.updateCourse(courseName, { persons: updatedPersons });
        }
        return new Observable(observer => observer.complete());
      })
    );
  }

  // Helper function to create a course if it doesn't exist and add the person
  private createCourseWithPerson(courseName: string, personId: string): Observable<any> {
    const newCourse: Course = {
      name: courseName,
      persons: [personId]
    };
    return this.addCourse(newCourse);
  }
}
