import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-establo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establo-form.component.html',
  styleUrl: './establo-form.component.css'
})
export class EstabloFormComponent implements OnInit {
  establos: { 
    nombre: string; ubicacion: string; capacidad: number; area: number; 
    corrales: { nombre: string; capacidad: number; tipo: string; material: string; cantidadAnimales: number }[] 
  }[] = [];

  indiceEstabloSeleccionado: number = -1;
  nuevoCorral = { nombre: '', capacidad: 0, tipo: 'Aislado', material: '', cantidadAnimales: 0 };

  ngOnInit() {
    // Cargar datos desde localStorage
    const datosGuardados = localStorage.getItem('establos');
    if (datosGuardados) {
      this.establos = JSON.parse(datosGuardados);
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('establos', JSON.stringify(this.establos));
  }

  agregarEstablo() {
    const nombre = prompt('Ingrese el nombre del establo:');
    const ubicacion = prompt('Ingrese la ubicación:');
    const capacidad = Number(prompt('Ingrese la capacidad:'));
    const area = Number(prompt('Ingrese el área en m²:'));
  
    if (nombre && ubicacion && capacidad > 0 && area > 0) {
      this.establos = [...this.establos, { nombre, ubicacion, capacidad, area, corrales: [] }];
      this.guardarEnLocalStorage();
    } else {
      alert('Debe completar todos los datos correctamente.');
    }
  }
  
  agregarCorral() {
    if (this.indiceEstabloSeleccionado !== -1) {
      this.establos[this.indiceEstabloSeleccionado].corrales.push({ ...this.nuevoCorral, cantidadAnimales: 0 });

      // 🔥 Forzar actualización en Angular
      this.establos = [...this.establos]; 

      this.guardarEnLocalStorage();
      this.indiceEstabloSeleccionado = -1;
    }
  }

  eliminarEstablo(index: number) {
    this.establos.splice(index, 1);
    this.guardarEnLocalStorage();
  }

  abrirModalCorral(index: number) {
    this.indiceEstabloSeleccionado = index;
    this.nuevoCorral = { nombre: '', capacidad: 0, tipo: 'Aislado', material: '', cantidadAnimales: 0 };
  }

  eliminarCorral(establoIndex: number, corralIndex: number) {
    this.establos[establoIndex].corrales.splice(corralIndex, 1);
    this.guardarEnLocalStorage();
  }
}
