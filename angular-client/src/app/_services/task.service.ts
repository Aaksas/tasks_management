import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../_classes/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient , private authService: AuthService) { }

  createTask(task : Task): Observable<any> {
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.post("http://localhost:3000/tasks/createTask", task, {headers: headers});
  }

  getTasks():Observable<any>{
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.get("http://localhost:3000/tasks/findtasks", {headers: headers});
  }

  delete(id :any):Observable<any>{
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.delete("http://localhost:3000/tasks/delete/"+id , {headers: headers});
  }

  update(id :any , data :any):Observable<any>{
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    console.log('data',data);
    
    return this.http.put("http://localhost:3000/tasks/update/"+id ,data, {headers: headers});
  }

}
