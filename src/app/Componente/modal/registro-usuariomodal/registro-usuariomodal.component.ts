import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuariomodal',
  standalone: true, // ⚠️ Agregar esto si Angular 15+ y usa imports en vez de declarations
  imports: [FormsModule],
  templateUrl: './registro-usuariomodal.component.html',
  styleUrl: './registro-usuariomodal.component.css'
})
export class RegistroUsuariomodalComponent {
  private _usuario: Usuario | null = null;

  @Input()
  set usuario(value: Usuario | null) {
    this._usuario = value ?? this.nuevoUsuario(); // Si es null, asigna un usuario vacío
  }
  get usuario(): Usuario {
    return this._usuario!;
  }

  @Output() usuarioGuardado = new EventEmitter<void>();

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario() {
    if (!this.usuario) return;

    if (this.usuario.id) {
      // 🔄 ACTUALIZAR USUARIO
      this.usuarioService.updateUsuario(this.usuario.id, this.usuario).subscribe({
        next: () => {
          this.mostrarToast('success', 'Usuario actualizado correctamente');
          this.usuarioGuardado.emit();
        },
        error: (err) => {
          this.mostrarError(err, 'Error al actualizar usuario');
        }
      });
    } else {
      // 🆕 CREAR NUEVO USUARIO
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: () => {
          this.mostrarToast('success', 'Usuario registrado correctamente');
          this.usuarioGuardado.emit();
        },
        error: (err) => {
          this.mostrarError(err, 'Error al registrar usuario');
        }
      });
    }
  }

  // ✅ Función para mostrar el Toast de éxito o error
  private mostrarToast(icon: 'success' | 'error', title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  // ⚠️ Función para mostrar errores detallados
  private mostrarError(error: any, mensajeBase: string) {
    console.error("Error en la API:", error);
    let mensaje = mensajeBase;

    if (error.status === 403) {
      mensaje = "No tienes permisos para realizar esta acción. ⚠️";
    } else if (error.status === 500) {
      mensaje = "Error interno en el servidor. 🚨";
    } else if (error.error && error.error.message) {
      mensaje = error.error.message;
    }

    Swal.fire({
      icon: 'error',
      title: '❌ Ocurrió un error',
      text: mensaje,
      confirmButtonText: 'Entendido'
    });
  }

  private nuevoUsuario(): Usuario {
    return {
      id: 0,
      nombre: '',
      correo: '',
      contrasena: '',
      telefono: '',
      idRol: 1, // ✅ Valor por defecto correcto
      estado: true, // ✅ Estado como booleano
      direccion: ''
    };
  }
}
