import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-proxy-users',
    templateUrl: './proxy-users.component.html',
    styleUrls: ['./proxy-users.component.scss']
})
export class ProxyUsersComponent implements OnInit {

    list: any[] = []
    constructor() { }

    ngOnInit(): void {
    }

}
