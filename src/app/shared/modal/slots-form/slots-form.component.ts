import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Slots, SlotAddModel, SlotAdd, Doctors } from './slots-form.model';
import { SlotsFormService } from './slots-form.service';

@Component({
    selector: 'app-slots-form',
    templateUrl: './slots-form.component.html',
    styleUrls: ['./slots-form.component.scss']
})
export class SlotsFormComponent implements OnInit {


    image: any;
    constructor(private slot: SlotsFormService, private modal: NgbModal) { }
    modellist: Slots[] = [];
    doctors: Doctors[] = [];
    gender: any[] = [{ id: 0, name: "Female" }, { id: 1, name: "Male" }]
    loading = false;
    confirm: string = "";
    Days: any[] = [{ name: "Monday" }, { name: "Tuesday" }, { name: "Wednesday" }, { name: "Thursday" }, { name: "Friday" }, { name: "Saturday" }, { name: "Sunday" }]

    @Input() inputValue: string = '';
    @Input() updateValue: boolean = false;
    @Input() model: SlotAddModel = new SlotAdd().init();
    @Input() data: any;
    @Input() id: any;

    slotForm = new FormGroup({
        slotDoctorId: new FormControl(this.model.slotDoctorId, [Validators.required]),
        slotDay: new FormControl(this.model.slotDay, [Validators.required]),
        slotStartTime: new FormControl(this.model.slotStartTime, [Validators.required]),
        slotEndTime: new FormControl(this.model.slotEndTime, [Validators.required]),
        slotCount: new FormControl(this.model.slotCount, [Validators.required]),
    })


    ngOnInit(): void {
        this.model.slotBelongsTo = JSON.parse(localStorage.getItem('User') || '').siteID
        this.model.slotCreatedBy = JSON.parse(localStorage.getItem('User') || '').Id
        // this.model.slotDoctorId = JSON.parse(localStorage.getItem('User') || '').Id
        this.getAllDoctors()
    }



    getAllDoctors() {
        let fd = new FormData();
        fd.append('doctorBelongsTo', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.slot.getAllDoctors(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.doctors = data.filter((x: any) => x.doctorIsActive === true)
                // this.modellist = data
            }
            // console.log(res)
        })
    }


    tConvert(time: any) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    submit() {
        this.loading = true

        let fd = new FormData()
        fd.append("slotDoctorId", this.slotForm.controls['slotDoctorId'].value || '')
        fd.append("slotDay", this.slotForm.controls['slotDay'].value || '')
        fd.append("slotStartTime", this.tConvert(this.slotForm.controls['slotStartTime'].value))
        fd.append("slotEndTime", this.tConvert(this.slotForm.controls['slotEndTime'].value))
        fd.append("slotCreatedBy", this.model.slotCreatedBy)
        fd.append("slotBelongsTo", this.model.slotBelongsTo)
        fd.append("slotCount", this.slotForm.controls['slotCount'].value || '')

        // console.log(fd)

        // return
        // let fd = new FormData()
        // fd.append("slotDoctorId", this.model.slotDoctorId)
        // fd.append("slotDay", this.model.slotDay)
        // fd.append("slotStartTime", this.tConvert(this.model.slotStartTime))
        // fd.append("slotEndTime", this.tConvert(this.model.slotEndTime))
        // fd.append("slotCreatedBy", this.model.slotCreatedBy)
        // fd.append("slotBelongsTo", this.model.slotBelongsTo)
        // fd.append("slotCount", this.model.slotCount)
        this.slot.addSlot(fd).subscribe((res) => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Added!',
                    text: 'Staff member successfully Added!',
                    confirmButtonColor: '#0D67B5'
                })
                this.modal.dismissAll();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Code ' + res['status'],
                    text: res['message'],
                    confirmButtonColor: '#0D67B5'
                })
            }
            this.loading = false
        }, err => {
            // // console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error Code ' + err['status'],
                text: err['message'],
                confirmButtonColor: '#0D67B5'
            })
            this.loading = false
        })
    }


    update() { }

    close() {

        this.modal.dismissAll();
    }
}
