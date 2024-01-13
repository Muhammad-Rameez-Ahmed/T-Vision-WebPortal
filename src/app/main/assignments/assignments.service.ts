import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AssignmentsService<T> {

  assignmentsList: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() { }
}
