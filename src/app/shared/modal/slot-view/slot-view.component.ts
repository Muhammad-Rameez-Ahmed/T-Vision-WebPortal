import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-slot-view',
    templateUrl: './slot-view.component.html',
    styleUrls: ['./slot-view.component.scss']
})
export class SlotViewComponent implements OnInit {

    constructor() { }


    page: number = 1;
    size: number = 10;
    total: number = 0;

    loading: boolean = true;
    field: string = 'index';
    @Input() data: any;
    list: any[] = []
    ngOnInit(): void {

        // this.list = this.data.filter((x: any) => x.sessionIsActive === true)
        // this.modellist = data
        // console.log(this.data)
        this.list = this.data.slice(0, 10);
    }



    pageChange(event: any) {
        // // console.log(event)
        this.list = this.data.slice((event - 1) * this.size, event * this.size)
        // // console.log(this.list)
    }
}
