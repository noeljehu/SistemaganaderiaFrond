import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistroUsuariomodalComponent } from "../../modal/registro-usuariomodal/registro-usuariomodal.component";
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

declare var bootstrap: any;
@Component({
  selector: 'app-usuario-form',
  imports: [FormsModule, RegistroUsuariomodalComponent,NgFor],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  
    usuarios: Usuario[] = [];
    usuarioSeleccionado: Usuario | null = null;
    modalInstance: any; // Instancia del modal de Bootstrap
  
    constructor(private usuarioService: UsuarioService) {}
  
    ngOnInit() {
      this.cargarUsuarios();
      const modalElement = document.getElementById('modalRegistroUsuario');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
    }
  
    cargarUsuarios() {
      this.usuarioService.getUsuarios().subscribe((data) => {
        this.usuarios = data;
      });
    }
  
    abrirModal(usuario?: Usuario) {
      this.usuarioSeleccionado = usuario ? { ...usuario } : this.nuevoUsuario();
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    }
  
    cerrarModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  
    nuevoUsuario(): Usuario {
      return {
        id: 0,
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
        idRol: 0,
        estado: 'activo',
        direccion: ''
      };
    }
    buscarUsuarioPorCorreo(correo: string) {
      this.usuarioService.getUsuarioByCorreo(correo).subscribe({
        next: (usuario) => {
          Swal.fire({
            title: "✅ Usuario encontrado",
            html: `
              <b>ID:</b> ${usuario.id} <br>
              <b>Nombre:</b> ${usuario.nombre} <br>
              <b>Correo:</b> ${usuario.correo} <br>
              <b>Teléfono:</b> ${usuario.telefono} <br>
              <b>Dirección:</b> ${usuario.direccion} <br>
              <b>Rol:</b> ${usuario.idRol} <br>
              <b>Estado:</b> ${usuario.estado} <br>
            `,
            icon: "success",
            confirmButtonText: "OK",
          });
        },
        error: (err) => {
          Swal.fire({
            title: "⚠️ Error",
            text: "Usuario no encontrado o error en la búsqueda.",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          console.error("Error al buscar usuario:", err);
        },
      });
    }
    

    editarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = { ...usuario };
    let modal = new bootstrap.Modal(document.getElementById('modalRegistroUsuario')!);
    modal.show();
  }

  

  borrarUsuario(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe(() => {
          this.cargarUsuarios();
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado correctamente.',
            'success'
          );
        });
      }
    });
  }
  
  }