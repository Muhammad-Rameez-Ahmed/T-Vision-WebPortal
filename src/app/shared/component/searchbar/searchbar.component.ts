import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.search()
    }


    list = [{ name: '2name', des: 'asdsad h uhjfsjkh jk kjh kjeqkje hjq' }, { name: '3name', des: 'asdsad h uhjfsjkh jk kjh kjeqkje hjq' }, { name: '4name', des: 'asdsad h uhjfsjkh jk kjh kjeqkje hjq' }, { name: '1name', des: 'asdsad h uhjfsjkh jk kjh kjeqkje hjq' }]
    blist = this.list


    @Input() inputValue: string = "";
    @Input() inputPlaceholder: string = "";
    @Input() inputWidth: string = "";

    search() {
        this.list = this.blist.filter(x => this.inputValue === x.name)
    }

    /**
     * Invoked when the model has been changed
     */
    @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
}
