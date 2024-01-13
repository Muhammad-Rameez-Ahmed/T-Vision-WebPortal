import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TeamsService<T> {
  
  teamsList: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() { }
}
