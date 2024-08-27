import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  id?: string;
  name: string;
  message: string;
  contacted: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = 'https://tunari-65fdc-default-rtdb.firebaseio.com/Student';

  constructor(private http: HttpClient) {}

  addStudent(student: Student): Observable<any> {
    const url = `${this.baseUrl}.json`;
    return this.http.post(url, student);
  }

  getAllStudents(): Observable<Record<string, Student>> {
    return this.http.get<Record<string, Student>>(`${this.baseUrl}.json`);
  }

  getStudentById(id: string): Observable<Student | null> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.get<Student>(url);
  }

  updateStudent(id: string, updatedData: Partial<Student>): Observable<any> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.put(url, updatedData);
  }

  deleteStudent(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.delete(url);
  }
}
