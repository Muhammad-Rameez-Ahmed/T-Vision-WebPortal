import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor() { }

  success(title: string): Promise<SweetAlertResult<any>> {
    return this.toast.fire({ icon: 'success', title });
  }

  warning(title: string): Promise<SweetAlertResult<any>> {
    return this.toast.fire({ icon: 'warning', title });
  }

  error(title: string): Promise<SweetAlertResult<any>> {
    return this.toast.fire({ icon: 'error', title });
  }

  async delete(): Promise<any> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#c4183c',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Record has been deleted.',
        'success'
      );
    }
  }

  close(): void {
    Swal.close();
  }
}
