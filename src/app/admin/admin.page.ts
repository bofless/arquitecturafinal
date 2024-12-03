import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
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
export class AdminPage implements OnInit {
  // Variables para alertas
  isAlertOpen = false;
  alertHeader = '';
  alertMessage = '';
  alertButtons = ['OK'];

  // Variables para registro de horas
  entryTime: Date | null = null;
  exitTime: Date | null = null;

  // Calendario de eventos
  events = [
    { title: 'Revisión de camiones', date: '2024-12-05' },
    { title: 'Reunión mensual', date: '2024-12-10' },
  ];

  // Inbox de inasistencias
  absenceMessage = '';

  // Documentos importantes
  documents = [
    { name: 'Manual de seguridad', link: '/docs/manual-seguridad.pdf' },
    { name: 'Normativa interna', link: '/docs/normativa-interna.pdf' },
  ];

  // Historial de modificaciones de camiones
  truckModifications = [
    { truck: 'Camión 1', detail: 'Cambio de aceite', date: '2024-11-15' },
    { truck: 'Camión 2', detail: 'Revisión de frenos', date: '2024-11-20' },
  ];

  // Historial de pedidos
  orderHistory = [
    { id: 1, date: '2024-12-01', status: 'Completado' },
    { id: 2, date: '2024-12-02', status: 'Pendiente' },
  ];

  // Crear y ver anuncios
  announcement = '';
  announcements: string[] = [];

  // Informes de repartidores y mecánicos
  reports = [
    { author: 'Repartidor 1', content: 'Problema en la ruta' },
    { author: 'Mecánico 1', content: 'Revisión completada' },
  ];

  constructor() {}

  ngOnInit() {}

  // Métodos
  setOpen(isOpen: boolean, header?: string, message?: string) {
    this.isAlertOpen = isOpen;
    this.alertHeader = header || '';
    this.alertMessage = message || '';
  }

  registerEntry() {
    const currentDate = new Date().toLocaleDateString();
    if (this.entryTime?.toLocaleDateString() === currentDate) {
      this.setOpen(true, 'Error', 'Ya registraste tu hora de entrada hoy.');
      return;
    }
    this.entryTime = new Date();
    this.setOpen(true, 'Éxito', `Hora de entrada registrada: ${this.entryTime.toLocaleTimeString()}`);
  }

  registerExit() {
    if (!this.entryTime) {
      this.setOpen(true, 'Error', 'Debes registrar tu hora de entrada antes de registrar la salida.');
      return;
    }
    const currentTime = new Date();
    const elapsedTime = (currentTime.getTime() - this.entryTime.getTime()) / (1000 * 60 * 60);

    if (elapsedTime < 5) {
      this.setOpen(true, 'Advertencia', 'No han pasado 5 horas desde tu entrada. ¿Quieres continuar?');
      return;
    }
    this.exitTime = currentTime;
    this.setOpen(true, 'Éxito', `Hora de salida registrada: ${this.exitTime.toLocaleTimeString()}`);
  }

  sendAbsenceNotice() {
    if (this.absenceMessage.trim()) {
      this.setOpen(true, 'Éxito', 'Aviso de inasistencia enviado.');
      this.absenceMessage = '';
    } else {
      this.setOpen(true, 'Error', 'Por favor, escribe un mensaje antes de enviarlo.');
    }
  }

  viewDocument(document: any) {
    window.open(document.link, '_blank');
  }

  createAnnouncement() {
    if (this.announcement.trim()) {
      this.announcements.push(this.announcement.trim());
      this.setOpen(true, 'Éxito', 'Anuncio creado.');
      this.announcement = '';
    } else {
      this.setOpen(true, 'Error', 'Por favor, escribe un anuncio antes de crearlo.');
    }
  }
}
