import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProjectsService<T> {

  projectsList: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() { }
}
