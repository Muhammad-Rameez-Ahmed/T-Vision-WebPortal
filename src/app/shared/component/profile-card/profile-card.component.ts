import { Component, Input, OnInit } from '@angular/core';
import { Profile } from './profile-card.model';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {


    @Input() profile: Profile = { 'NA': 'NA' }
    constructor() { }

    ngOnInit(): void {
    }

}
