import { Component } from '@angular/core';
import { GanadoModalComponent } from "../../modal/ganado-modal/ganado-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-ganado-form',
  imports: [GanadoModalComponent],
  templateUrl: './ganado-form.component.html',
  styleUrl: './ganado-form.component.css'
})
export class GanadoFormComponent {
  ganado: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.ganado.nativeElement);
    modal.show();
  }

}
