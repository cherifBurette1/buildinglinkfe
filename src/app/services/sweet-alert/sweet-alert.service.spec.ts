import { SweetAlertService } from './sweet-alert.service';
import Swal from 'sweetalert2';

describe('SweetAlertService', () => {
  let service: SweetAlertService;

  beforeEach(() => {
    service = new SweetAlertService();
    spyOn(Swal, 'fire');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Swal.fire with success type by default', () => {
    service.showToast('Success message');
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'success',
      title: 'Success message',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    }));
  });

  it('should call Swal.fire with specified type', () => {
    service.showToast('Error message', 'error');
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      icon: 'error',
      title: 'Error message',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    }));
  });

});
