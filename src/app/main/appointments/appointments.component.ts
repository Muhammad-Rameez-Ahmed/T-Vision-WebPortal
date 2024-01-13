import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDetailsComponent } from 'src/app/shared/modal/appointment-details/appointment-details.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Appointments } from '../appointment-doctor/appointment-doctor.model';
import Swal from 'sweetalert2';
import { AppointmentDoctorService } from '../appointment-doctor/appointment-doctor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AppointmentsModel } from 'src/app/shared/modal/appointments-view/appointments-view.model';
import { AppointmentsService } from './appointments.service';
import { ClinicsModel } from './appointments.model';
import { AppointmentMarkingComponent } from 'src/app/shared/modal/appointment-marking/appointment-marking.component';

export interface User {
    name: string;
}
@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

    myControl = new FormControl();
    options: string[] = ['asd', 'Mumbai', 'Banglore'];
    http: any;
    loading = true;

    constructor(
        private vcr: ViewContainerRef,
        public modal: NgbModal,
        private appointments: AppointmentsService,

    ) { }


    model: ClinicsModel[] = []


    clinics = [
        {
            name: 'Clinic Name',
            doctors: [{
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:12 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:23 AM',
                    booked: false,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            },
            {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }]
        },
        {
            name: 'Clinic Name',
            doctors: [{
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }, {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }, {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: false,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: false,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            },
            {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }]
        },
        {
            name: 'Clinic Name',
            doctors: [{
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            },
            {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }]
        },
        {
            name: 'Clinic Name',
            doctors: [{
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            },
            {
                name: 'john doe',
                address: 'somewhere in a hospital',
                speciality: 'cardio Specialist',
                timings: [{
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                },
                {
                    time: '9:00 AM',
                    booked: true,
                    patientName: 'john snow',
                    reason: 'monthly check up for no reason'
                }]
            }]
        }
    ]



    cities3 = [
        {
            id: 1,
            name: 'Vilnius',
            avatar:
                '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
        },
        {
            id: 2,
            name: 'Kaunas',
            avatar:
                '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15',
        },
        {
            id: 3,
            name: 'Pavilnys',
            avatar:
                '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
        },
    ];



    list: any[] = [
        { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'John Snow', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'someone', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'John doe', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'ken', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'random', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }, { name: 'name', id: '123123123', age: '33 Years', gender: 'Male', last: '23-9-2022', image: '../../../../assets/images/Ellipse 5.png' }
    ]
    selectedCityName = '';


    patientList: any[] = []

    role: any;

    modellist: Appointments[] = []
    status: any[] = [];
    selectedStatus: any = 0;
    selectedDate: any = '';
    minDate = new Date();
    id: any;
    date: Date = new Date();
    ngOnInit(): void {
        // this.modal.open(AppointmentDetailsComponent, { backdrop: 'static', keyboard: false, windowClass: 'modal-animate', centered: true })
        this.role = localStorage.getItem('role')
        // this.openModal();
        let searchLabel: any;
        this.patientList = this.list
        this.patientList = this.patientList.map(x => {
            x.searchLabel = ` ${x.id} ${x.name} ${x.age} `
            return (x)
        });

        this.minDate.setDate(this.minDate.getDate());
        this.date = this.minDate
        // // console.log(this.patientList)
        // this.clinics.forEach((key) => {
        //     // console.log(key)
        // })
        // this.minDate = new Date();
        this.id = JSON.parse(localStorage.getItem('User') || '').Id
        // this.getAllStatus(date);
        this.getAllAppointments(this.dateFormatter())
    }


    dateFormatter() {

        const yyyy = this.date.getFullYear();
        let mm = (this.date.getMonth() + 1).toString();
        let dd = this.date.getDate().toString();

        if (+dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }


    dateChange() {
        this.loading = true
        this.getAllAppointments(this.dateFormatter())
    }




    openModal(data: any) {
        const modalRef = this.modal.open(AppointmentDetailsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })

        modalRef.componentInstance.data = data
        modalRef.componentInstance.modelDate = this.date
        modalRef.result.then((data) => {

        }, (reason) => {
            if (reason === true) {
                this.getAllAppointments(this.dateFormatter());
            }
        })
    }

    // onWheel(event: WheelEv          

    todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

    done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
    d = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog1'];


    // check(event: CdkDragDrop<any>){

    // }



    value = '';

    drop(event: CdkDragDrop<any[]>) {
        // event.previousContainer.data['time'] = event
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            var temp = event.container.data[event.previousIndex].sessionStartTime
            event.container.data[event.previousIndex].sessionStartTime = event.container.data[event.currentIndex].sessionStartTime
            event.container.data[event.currentIndex].sessionStartTime = temp
        }


        else if (event.container.data[event.currentIndex] !== undefined) {
            var temp = event.container.data[event.currentIndex]
            event.container.data[event.currentIndex] = event.previousContainer.data[event.previousIndex]
            event.previousContainer.data[event.previousIndex] = temp

            var temp = event.container.data[event.currentIndex].sessionStartTime
            event.container.data[event.currentIndex].time = event.previousContainer.data[event.previousIndex].sessionStartTime
            event.previousContainer.data[event.previousIndex].sessionStartTime = temp

        } else {

            event.container.data[event.currentIndex] = event.previousContainer.data[event.previousIndex]
            event.previousContainer.data[event.previousIndex] = {
                sessionStartTime: event.previousContainer.data[event.previousIndex].sessionStartTime,
                sessionEndTime: event.previousContainer.data[event.previousIndex].sessionEndTime,
                sessionIsActive: event.previousContainer.data[event.previousIndex].sessionIsActive,
                sessionDetail: event.previousContainer.data[event.previousIndex].sessionDetail
                // booked: true,
                // patientName: 'john snow',
                // reason: 'monthly check up for no reason'
            }
            // // console.log(event.container.data[event.currentIndex])
            // // console.log(event.previousContainer.data[event.previousIndex])
            // transferArrayItem(
            //     event.previousContainer.data,
            //     event.container.data,
            //     event.previousIndex,
            //     event.currentIndex,
            // );
        }
        event.container.data.sort((a, b) => (a.sessionStartTime < b.sessionStartTime ? -1 : 1))
        event.previousContainer.data.sort((a, b) => (a.sessionStartTime < b.sessionStartTime ? -1 : 1))
    }


    getAllAppointments(date: any) {
        let fd = new FormData();
        let siteId = JSON.parse(localStorage.getItem('User') || '').siteID
        fd.append('siteId', siteId)
        // fd.append('appointmentStatus', status)
        fd.append('date', date)
        this.appointments.getAllAppointments(fd).subscribe(res => {
            if (res['status'] === 204) {
                this.model = res['data'].filter((x: any) =>
                    x.slots.length !== 0
                )
                this.loading = false
                // this.modellist = res['data']
                // // console.log(this.model)
            }
        })
    }

    // getAllStatus(date: any) {
    //     this.appointments.getAllStatus({}).subscribe(res => {
    //         if (res['data']) {
    //             this.status = res['data']
    //         }
    //     })

    //     this.getAllAppointments(this.selectedStatus, date);
    // }

    // show() {
    //     this.selectedDate = new Date(this.selectedDate)

    //     const yyyy = this.selectedDate.getFullYear();
    //     let mm = this.selectedDate.getMonth() + 1; // Months start at 0!
    //     let dd = this.selectedDate.getDate();

    //     if (dd < 10) dd = '0' + dd;
    //     if (mm < 10) mm = '0' + mm;

    //     const date = dd + '-' + mm + '-' + yyyy;
    //     // let date = new Date(this.selectedDate).getDate() + '-' + (+new Date(this.selectedDate).getMonth() + 1) + '-' + new Date(this.selectedDate).getFullYear()
    //     this.getAllAppointments(this.selectedStatus, date);
    // }

    // update(item: any) {
    //     let fd = new FormData();
    //     fd.append('appointmentId', item)
    //     fd.append('appointmentStatus', '0')
    //     Swal.fire({
    //         title: 'Completed?',
    //         text: 'Are you sure want to mark Appointment as Completed?',
    //         icon: 'warning',
    //         cancelButtonText: 'No',
    //         denyButtonText: 'yes',
    //         // confirmButtonColor: '#6e7881',
    //         showCancelButton: true,
    //         showDenyButton: true,
    //         showConfirmButton: false

    //     }).then(res => {
    //         if (res.isDenied) {
    //             this.appointments.updateAppStatus(fd).subscribe(res => {
    //                 if (res['status'] === 200) {
    //                     Swal.fire({
    //                         icon: 'success',
    //                         title: 'Successful!',
    //                         text: res['message'],
    //                         confirmButtonColor: '#0D67B5'
    //                     })
    //                     this.show()
    //                 }
    //                 else {
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error Code ' + res['status'],
    //                         text: res['message'],
    //                         confirmButtonColor: '#0D67B5'
    //                     })
    //                 }
    //             }, err => {
    //                 // // console.log(err);
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Error Code ' + err['status'],
    //                     text: err['message'],
    //                     confirmButtonColor: '#0D67B5'
    //                 })
    //             })
    //         }
    //     })
    // }
    viewDetails(data: {}) {
        const modalRef = this.modal.open(AppointmentMarkingComponent, { windowClass: 'modal-animate', centered: true, size: 'md' })
        // console.log(data)
        modalRef.componentInstance.data = data
        modalRef.result.then((data) => {
        }, (reason) => {
            if (reason === true) {
                this.getAllAppointments(this.dateFormatter());
            }
        });
    }
}
