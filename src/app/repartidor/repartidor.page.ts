import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

// Configuración del ícono predeterminado
const DefaultIcon = L.icon({
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});
L.Marker.prototype.options.icon = DefaultIcon;

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonList,
  IonAlert,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.page.html',
  styleUrls: ['./repartidor.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonTextarea,
    IonItem,
    IonLabel,
    IonList,
    IonAlert,
    CommonModule,
    FormsModule,
  ],
})
export class RepartidorPage implements OnInit, AfterViewInit {
  // Variables para las alertas
  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertSubHeader: string = '';
  alertMessage: string = '';
  alertButtons: any[] = [];

  // Variables para datos simulados
  orders = [
    { id: 1, status: 'Pendiente' },
    { id: 2, status: 'En camino' },
  ];

  orderHistory = [
    { id: 1, date: '2023-11-01', status: 'Entregado' },
    { id: 2, date: '2023-11-02', status: 'Entregado' },
  ];

  documents = [
    { name: 'Manual de Conducción', link: '/docs/manual-conduccion.pdf' },
    { name: 'Normas de Seguridad', link: '/docs/normas-seguridad.pdf' },
  ];

  truckReport: string = '';
  adminMessage: string = '';
  entryTime: Date | null = null;
  exitTime: Date | null = null;
  entryDate: string | null = null;

  // Variables para el mapa
  map: L.Map | undefined;
  repartidorLocation: [number, number] = [-33.4489, -70.6693]; // Ubicación del repartidor
  pedidoDestination: [number, number] = [-33.4569, -70.6483]; // Destino del pedido

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  // Inicializa el mapa
  initMap() {
    this.map = L.map('map').setView(this.repartidorLocation, 14);

    // Añade el mapa base desde OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Añade marcadores para el repartidor y el destino
    L.marker(this.repartidorLocation)
    .addTo(this.map)
    .bindPopup('Repartidor Aquí')
    .openPopup();

    L.marker(this.pedidoDestination)
      .addTo(this.map)
      .bindPopup('Destino del pedido');
  }

  // Simula la carga de ruta entre dos puntos
  loadRoute() {
    if (!this.map) return;

    // Simulación de línea entre el repartidor y el destino
    const routeCoordinates: [number, number][] = [
      this.repartidorLocation,
      this.pedidoDestination,
    ];
    const polyline = L.polyline(routeCoordinates, { color: 'blue' }).addTo(this.map);

    // Ajustar el mapa para que ambos puntos sean visibles
    this.map.fitBounds(polyline.getBounds());
  }

  // Configurar y abrir la alerta
  setOpen(isOpen: boolean, options?: { header?: string; subHeader?: string; message?: string; buttons?: any[] }) {
    if (options) {
      this.alertHeader = options.header || '';
      this.alertSubHeader = options.subHeader || '';
      this.alertMessage = options.message || '';
      this.alertButtons = options.buttons || [];
    }
    this.isAlertOpen = isOpen;
  }

  // Confirmar pedido
  confirmOrder(orderId: number) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = 'En camino';
      this.setOpen(true, {
        header: 'Éxito',
        message: `Pedido #${orderId} confirmado como "En camino".`,
        buttons: ['OK'],
      });
    }
  }

  // Enviar reporte del camión
  sendTruckReport() {
    if (this.truckReport.trim()) {
      this.setOpen(true, {
        header: 'Éxito',
        message: 'Reporte enviado: ' + this.truckReport,
        buttons: ['OK'],
      });
      this.truckReport = '';
    } else {
      this.setOpen(true, {
        header: 'Error',
        message: 'Por favor, escribe un reporte antes de enviarlo.',
        buttons: ['OK'],
      });
    }
  }

  // Enviar correo al administrador
  sendAdminEmail() {
    if (this.adminMessage.trim()) {
      this.setOpen(true, {
        header: 'Éxito',
        message: 'Correo enviado al administrador: ' + this.adminMessage,
        buttons: ['OK'],
      });
      this.adminMessage = '';
    } else {
      this.setOpen(true, {
        header: 'Error',
        message: 'Por favor, escribe un mensaje antes de enviarlo.',
        buttons: ['OK'],
      });
    }
  }

  // Registrar entrada
  registerEntry() {
    const currentDate = new Date().toLocaleDateString();
    if (this.entryDate === currentDate) {
      this.setOpen(true, {
        header: 'Error',
        message: 'Ya registraste tu hora de entrada hoy.',
        buttons: ['OK'],
      });
      return;
    }
    this.entryTime = new Date();
    this.entryDate = currentDate;
    this.setOpen(true, {
      header: 'Éxito',
      message: `Hora de entrada registrada: ${this.entryTime.toLocaleTimeString()}`,
      buttons: ['OK'],
    });
  }

  // Registrar salida
  registerExit() {
    if (!this.entryTime) {
      this.setOpen(true, {
        header: 'Error',
        message: 'Debes registrar tu hora de entrada antes de registrar la salida.',
        buttons: ['OK'],
      });
      return;
    }
    const currentTime = new Date();
    const elapsedTime = (currentTime.getTime() - this.entryTime.getTime()) / (1000 * 60 * 60);

    if (elapsedTime < 5) {
      this.setOpen(true, {
        header: 'Advertencia',
        message: 'No han pasado 5 horas desde tu entrada. ¿Quieres continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.confirmExit();
            },
          },
        ],
      });
      return;
    }

    this.confirmExit();
  }

  // Confirmar salida
  confirmExit() {
    this.exitTime = new Date();
    this.setOpen(true, {
      header: 'Éxito',
      message: `Hora de salida registrada: ${this.exitTime.toLocaleTimeString()}`,
      buttons: ['OK'],
    });
  }

  // Ver documentos importantes
  viewDocument(document: { name: string; link: string }) {
    window.open(document.link, '_blank');
  }
}
