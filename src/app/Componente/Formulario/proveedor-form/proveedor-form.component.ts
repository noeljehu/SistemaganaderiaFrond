import { Component } from '@angular/core';
import { ProveedorModalComponent } from "../../modal/proveedor-modal/proveedor-modal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-proveedor-form',
  imports: [ProveedorModalComponent],
  templateUrl: './proveedor-form.component.html',
  styleUrl: './proveedor-form.component.css'
})
export class ProveedorFormComponent {
  proveedor: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.proveedor.nativeElement);
    modal.show();
  }
}
