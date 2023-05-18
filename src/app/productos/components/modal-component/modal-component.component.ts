import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent {
  @Input() mensaje: string;

  constructor(public modal: NgbActiveModal) { }


  public cerrarModal() {
    this.modal.close();
  }
  public dimissModal() {
    this.modal.dismiss();
  }
}
