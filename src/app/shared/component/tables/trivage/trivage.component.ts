import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-trivage',
    templateUrl: './trivage.component.html',
    styleUrls: ['./trivage.component.scss']
})
export class TrivageComponent implements OnInit {

    list: any[] = []
    // list = [{ question: 'this is a question?', answer: 'this is an detailed answer of the question' }, { question: 'this is a question?', answer: 'this is an detailed answer of the question' }, { question: 'this is a question?', answer: 'this is an detailed answer of the question' }, { question: 'this is a question?', answer: 'this is an detailed answer of the question' }, { question: 'this is a question?', answer: 'this is an detailed answer of the question' }, { question: 'this is a question?', answer: 'this is an detailed answer of the question' }]
    constructor() { }

    ngOnInit(): void {
    }

}
