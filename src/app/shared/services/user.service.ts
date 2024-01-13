import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }


    userData = new Subject<any>();


    setUserData(payload: any) {
        this.userData.next(payload)
    }
}
