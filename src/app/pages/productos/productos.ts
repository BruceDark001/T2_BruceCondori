import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = {
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
    marca: '',
    codigoBarras: ''
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  guardarProducto() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        alert('Producto registrado con éxito');
        this.cargarProductos();
        this.nuevoProducto = { nombre: '', categoria: '', precio: 0, stock: 0, marca: '', codigoBarras: '' };
      },
      error: (err) => {
        console.error('Error al registrar producto', err);
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.cargarProductos();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
        }
      });
    }
  }
}