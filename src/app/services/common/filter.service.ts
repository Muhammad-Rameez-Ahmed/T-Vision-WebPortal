import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable
    ({
        providedIn: 'root'
    })
export class FilterService {
    constructor() { }
    public value = new BehaviorSubject<string>('');
    public castValue = this.value.asObservable();

    editValue(newValue: string) {
        // console.log('edit: ', newValue)
        this.value.next(newValue);
        // console.log('get: ', this.castValue)
        this.castValue.subscribe(value => {
            // console.log('Subscription received the value ', value);

            // Subscription received B. It would not happen
            // for an Observable or Subject by default.
        });
    }

    retValue() {
        return this.value
    }
}