import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ClientsService<T> {

  clientsList: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() { }
}
