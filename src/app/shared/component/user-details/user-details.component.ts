import { Component, Input, OnInit } from '@angular/core';
import { UserAdd } from 'src/app/auth/auth.model';
import { UserAddModel } from '../../modal/user-form/user-form.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  image: any;

  constructor() {}

  @Input() model!: UserAddModel;
  @Input() data: any;

  ngOnInit(): void {
    // Assuming model is an object
    let jsonString = JSON.stringify(this.model);
    console.log('asd', this.model);

    console.log('ram', this.data);
    // Output the JSON string representation of model
  }
}
