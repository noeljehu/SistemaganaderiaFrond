import { Component } from '@angular/core';
import { RegistroUsuariomodalComponent } from "../../modal/registro-usuariomodal/registro-usuariomodal.component";
declare var bootstrap: any;
@Component({
  selector: 'app-usuario-form',
  imports: [RegistroUsuariomodalComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  registrousuario: any;
  abrirModal() {
    const modal = new bootstrap.Modal(this.registrousuario.nativeElement);
    modal.show();
  }
}
