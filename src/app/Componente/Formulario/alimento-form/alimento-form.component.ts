import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlimentosModalComponent } from "../../modal/alimentos-modal/alimentos-modal.component";
declare var bootstrap: any;

@Component({
  selector: 'app-alimento-form',
  imports: [AlimentosModalComponent],
  templateUrl: './alimento-form.component.html',
  styleUrl: './alimento-form.component.css'
})
export class AlimentoFormComponent {
  @ViewChild('modalAlimento') modalAlimento!: ElementRef;

  abrirModal() {
    const modal = new bootstrap.Modal(this.modalAlimento.nativeElement);
    modal.show();
  }

}
