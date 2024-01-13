import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorAppointmentsComponent } from 'src/app/shared/modal/doctor-appointments/doctor-appointments.component';
import { SlotViewComponent } from 'src/app/shared/modal/slot-view/slot-view.component';
import { SlotsFormComponent } from 'src/app/shared/modal/slots-form/slots-form.component';
import { Doctors } from '../doctors/doctors.model';
import { DoctorsService } from '../doctors/doctors.service';
import { Slots } from './slots.model';
import { SlotsService } from './slots.service';

@Component({
    selector: 'app-slots',
    templateUrl: './slots.component.html',
    styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

    constructor(public modal: NgbModal, private slots: SlotsService,
        private doctor: DoctorsService) { }



    doctorList: Doctors[] = [];
    page: number = 1;
    size: number = 8;
    total: number = 0;
    loading: boolean = true;
    field: string = 'index';

    modellist: Slots[] = [];
    list: any[] = [];
    // templist: any[] = [{}];
    temp = { Monday: [{}], Tuesday: [{}], Wednesday: [{}], Thursday: [{}], Friday: [{}], Saturday: [{}], Sunday: [{}] };

    day: string = '';
    Days: any[] = [{ name: "Monday" }, { name: "Tuesday" }, { name: "Wednesday" }, { name: "Thursday" }, { name: "Friday" }, { name: "Saturday" }, { name: "Sunday" }]
    id: any;
    ngOnInit(): void {
        // this.id = JSON.parse(localStorage.getItem('User') || '').Id
        this.getAllDoctors()
        // this.getAllSlot()
        // console.log(this.temp['Monday'])
    }

    sorter: any = {
        // "sunday": 0, // << if sunday is first day of week
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
        "sunday": 7
    }



    getAllSlot() {
        let fd = new FormData();
        fd.append('doctorId', this.id.toString())
        this.slots.getAllSlot(fd).subscribe(res => {
            if (res['status'] === 200) {
                let data = res['data']
                this.modellist = data.filter((x: any) => x.slotStatus === true)
                // this.modellist = data
                // console.log('model: ', this.modellist)
                this.list = this.modellist.slice(0, 8);

                Object.entries(this.temp).forEach(([items, value]) => {
                    this.list.forEach(item => {
                        if (items === item.slotDay) {

                            value.push(item)
                        }
                    })
                    // this.temp[item.slotDay]
                })

                let temp = this.modellist.sort((a: any, b: any) => {
                    let d1 = a.slotDay
                    let d2 = b.slotDay
                    return this.sorter[d2] - this.sorter[d1]
                })
                // console.log('sort: ', temp)
                // console.log(this.temp)

                // value = value.filter(value => Object.keys(value).length !== 0);
            }
            // // console.log(res)
        })

    }

    add(isUpdate: boolean) {
        const modalRef = this.modal.open(SlotsFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg', backdrop: 'static' })
        modalRef.componentInstance.inputValue = 'Add'
        modalRef.componentInstance.updateValue = isUpdate

        modalRef.result.then((data) => {
        }, (reason) => {
            // this.getAllStaff();
            this.getAllSlot();
        });
    }



    pageChange(event: any) {
        // console.log(event)
        if (this.day) {
            this.list = this.modellist.filter(x => { x.slotDay.includes(this.day) }).slice((event - 1) * this.size, event * this.size)
        }
        this.list = this.modellist.slice((event - 1) * this.size, event * this.size)
        // console.log(this.list)
    }


    showView(sessions: any) {

        const modalRef = this.modal.open(SlotViewComponent, { windowClass: 'modal-animate', centered: true, size: 'sm' })
        modalRef.componentInstance.data = sessions;
    }


    getAllDoctors() {
        let fd = new FormData();
        fd.append('doctorBelongsTo', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.doctor.getAllDoctors(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.doctorList = data.filter((x: any) => x.doctorIsActive === true)
                this.id = this.doctorList[0].doctorId
                this.getAllSlot()
                // this.modellist = data
                // this.list = this.modellist.slice(0, 10);
                // // console.log(this.list)
            }
            // console.log(res)
        })
    }

    filter() {
        this.list = this.modellist.filter(x => { x.slotDay.includes(this.day) }).slice((this.page - 1) * this.size, this.page * this.size)
    }
}
