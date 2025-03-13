import { Component } from '@angular/core';

@Component({
  selector: 'app-venta-form',
  imports: [],
  templateUrl: './venta-form.component.html',
  styleUrl: './venta-form.component.css'
})
export class VentaFormComponent {
  clienteId: string = '';
  fechaVenta: string = '';
  ganadoId: string = '';
  peso: number | null = null;
  precioPorKilo: number | null = null;
  detalles: { ganadoId: string, peso: number, precioPorKilo: number, subtotal: number }[] = [];
  total: number = 0;

  agregarGanado() {
    if (!this.ganadoId || !this.peso || !this.precioPorKilo) {
      alert('Por favor, complete todos los campos del ganado.');
      return;
    }

    const subtotal = this.peso * this.precioPorKilo;
    this.detalles.push({
      ganadoId: this.ganadoId,
      peso: this.peso,
      precioPorKilo: this.precioPorKilo,
      subtotal: subtotal
    });

    this.calcularTotal();
    this.limpiarCampos();
  }

  eliminarGanado(detalle: any) {
    this.detalles = this.detalles.filter(item => item !== detalle);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.detalles.reduce((acc, item) => acc + item.subtotal, 0);
  }

  limpiarCampos() {
    this.ganadoId = '';
    this.peso = null;
    this.precioPorKilo = null;
  }
}

