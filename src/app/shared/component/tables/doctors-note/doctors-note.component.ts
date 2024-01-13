import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-doctors-note',
    templateUrl: './doctors-note.component.html',
    styleUrls: ['./doctors-note.component.scss']
})
export class DoctorsNoteComponent implements OnInit {

    isReadMore: boolean[] = [];
    list = [{ note: 'this a doctors note given to this patient', doctor: 'Dr John Kent', date: '11/11/1111 9:00 PM' }, { note: 'this a doctors note given to this patient', doctor: 'Dr John Kent', date: '11/11/1111 9:00 PM' }, { note: 'this a doctors note given to this patient', doctor: 'Dr John Kent', date: '11/11/1111 9:00 PM' }, { note: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum', doctor: 'Dr John Kent', date: '11/11/1111 9:00 PM' }, { note: 'this a doctors note given to this patient', doctor: 'Dr John Kent', date: '11/11/1111 9:00 PM' }]
    @Input() notesList: any[] = []
    constructor() { }

    ngOnInit(): void {
        this.list.forEach(x => {
            this.isReadMore.push(true);
        })
        console.log('notes', this.notesList)
    }

    showText(i: number) {
        this.isReadMore[i] = !this.isReadMore[i]
    }
}
