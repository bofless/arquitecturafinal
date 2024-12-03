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
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonAlert,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.page.html',
  styleUrls: ['./mecanico.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonAlert,
  ],
})
export class MecanicoPage implements OnInit {
  // Variables para la selección del camión
  trucks = [
    { name: 'Camión 1', id: 1 },
    { name: 'Camión 2', id: 2 },
    { name: 'Camión 3', id: 3 },
  ];
  selectedTruck: any = null;

  // Historial de modificaciones
  truckModifications = [
    { truckId: 1, detail: 'Cambio de Aceite', date: '2023-11-01' },
    { truckId: 1, detail: 'Revisión de Motor', date: '2023-11-03' },
    { truckId: 2, detail: 'Cambio de Filtros', date: '2023-11-02' },
  ];

  // Checklist de mantenimiento
  maintenanceChecklist = [
    { task: 'Verificar nivel de aceite', completed: false },
    { task: 'Revisar presión de neumáticos', completed: false },
    { task: 'Inspeccionar luces y señales', completed: false },
  ];

  // Registro de piezas utilizadas
  partsUsed: string = '';

  // Variables para registro de horas
  entryTime: Date | null = null;
  exitTime: Date | null = null;

  // Fechas importantes
  events = [
    { title: 'Cambio general de aceite', date: '2023-12-10' },
    { title: 'Revisión semestral de camiones', date: '2024-01-15' },
  ];

  // Anuncios
  announcements = ['Mantenimiento obligatorio el lunes', 'Revisión de luces'];

  // Reportes de camiones
  truckReports = [
    { title: 'Revisión de neumáticos', date: '2023-11-20', details: 'Presión baja en ruedas traseras.' },
    { title: 'Fallo en luces delanteras', date: '2023-11-22', details: 'Luces delanteras no funcionan.' },
  ];

  constructor() {}

  ngOnInit() {}

  // Filtrar modificaciones por camión seleccionado
  getFilteredModifications() {
    if (!this.selectedTruck) return [];
    return this.truckModifications.filter(
      (modification) => modification.truckId === this.selectedTruck.id
    );
  }

  // Actualizar checklist
  toggleChecklist(task: any) {
    task.completed = !task.completed;
  }

  // Guardar piezas utilizadas
  savePartsUsed() {
    if (this.partsUsed.trim()) {
      alert(`Piezas registradas: ${this.partsUsed}`);
      this.partsUsed = '';
    } else {
      alert('No puedes registrar un campo vacío.');
    }
  }

  // Actualizar todos los cambios
  updateTruckData() {
    if (!this.selectedTruck) {
        alert('Por favor selecciona un camión primero.');
        return;
    }

    const completedTasks = this.maintenanceChecklist.filter((task) => task.completed);
    const changesMade = {
        truckName: this.selectedTruck.name,
        modifications: this.getFilteredModifications(),
        completedChecklist: completedTasks,
        partsUsed: this.partsUsed.trim(),
    };

    alert(`Registro actualizado para ${this.selectedTruck.name}:
    - Modificaciones realizadas: ${changesMade.modifications.map((mod) => mod.detail).join(', ') || 'Ninguna'}
    - Tareas completadas: ${completedTasks.map((task) => task.task).join(', ') || 'Ninguna'}
    - Piezas utilizadas: ${changesMade.partsUsed || 'Ninguna'}`);

    // Resetear estado tras la actualización
    this.maintenanceChecklist.forEach((task) => (task.completed = false));
    this.partsUsed = '';
    this.selectedTruck = null;
}


  // Registro de entrada y salida
  registerEntry() {
    this.entryTime = new Date();
    alert(`Hora de entrada registrada: ${this.entryTime.toLocaleTimeString()}`);
  }

  registerExit() {
    if (!this.entryTime) {
      alert('Primero registra tu hora de entrada.');
      return;
    }
    this.exitTime = new Date();
    alert(`Hora de salida registrada: ${this.exitTime.toLocaleTimeString()}`);
  }
  
}
