import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Person {
  id?: string;
  name: string;
  courses: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly baseUrl = 'https://tunari-65fdc-default-rtdb.firebaseio.com/Person';

  constructor(private http: HttpClient) {}

  addPerson(person: Person): Observable<any> {
    const url = `${this.baseUrl}.json`;
    return this.http.post(url, person);
  }

  getAllPersons(): Observable<Record<string, Person>> {
    return this.http.get<Record<string, Person>>(`${this.baseUrl}.json`);
  }

  getPersonById(id: string): Observable<Person | null> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.get<Person>(url);
  }

  updatePerson(id: string, updatedData: Partial<Person>): Observable<any> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.put(url, updatedData);
  }

  deletePerson(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.delete(url);
  }

  addCourseToPerson(personId: string, courseId: string): Observable<any> {
    return this.getPersonById(personId).pipe(
      switchMap(person => {
        if (person) {
          person.courses.push(courseId);
          return this.updatePerson(personId, person);
        }
        return new Observable(observer => observer.error('Person not found'));
      })
    );
  }

  removeCourseFromPerson(personId: string, courseId: string): Observable<any> {
    return this.getPersonById(personId).pipe(
      switchMap(person => {
        if (person) {
          person.courses = person.courses.filter(course => course !== courseId);
          return this.updatePerson(personId, person);
        }
        return new Observable(observer => observer.error('Person not found'));
      })
    );
  }
}