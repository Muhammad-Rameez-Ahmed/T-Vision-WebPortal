import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Members } from './members.model';

@Injectable()
export class MembersService<T> {

  membersList: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() { }
}
