import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiURL = "https://jsonplaceholder.typicode.com";


  constructor(private htpp: HttpClient) { }

  getPlaceHolders(): Observable<any> {
    return this.htpp.get(this.apiURL+'/todos').pipe(
      retry(3),
    );
  }

  getPlaceHoldersById(id: number): Observable<any> {
    return this.htpp.get(this.apiURL+'/todos/'+id).pipe(
      retry(3),
    );
  }

  postPlaceHolders(post: any): Observable<any> {
    return this.htpp.post(this.apiURL+'/post', post, this.httpOptions).pipe(
      retry(3),
    );
  }

  updatePlaceHolders(id: number, post: any): Observable<any> {
    return this.htpp.put(this.apiURL+'/post/'+id, post, this.httpOptions).pipe(
      retry(3),
    );
  }

  deletePlaceHolders(id: number): Observable<any> {
    return this.htpp.delete(this.apiURL+'/post/'+id, this.httpOptions)
  }

  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m`;
    return this.htpp.get(url);
  }

  getComentarios(): Observable<any> {
    return this.htpp.get(this.apiURL+'/comments/').pipe(
    retry(3),
    );
}

}
