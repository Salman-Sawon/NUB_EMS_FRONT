import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jsonDataSubject = new BehaviorSubject<any>({}); // Initial empty object
  jsonData$ = this.jsonDataSubject.asObservable(); // Observable for subscription

  constructor() {}

  // Method to set JSON data
  setData(data: any): void {
    this.jsonDataSubject.next(data);
  }

  // Method to get the current value of JSON data
  getData(): any {
    return this.jsonDataSubject.getValue();
  }
}
