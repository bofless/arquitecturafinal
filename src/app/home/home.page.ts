import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    FormsModule, // Añadido aquí
  ],
})
export class HomePage {
  selectedRole: string | null = null; // Rol seleccionado

  constructor(private router: Router) {}

  onLogin() {
    if (this.selectedRole) {
      // Navegar a la página correspondiente según el rol seleccionado
      this.router.navigate([`/${this.selectedRole}`]);
    } else {
      alert('Por favor, seleccione un rol antes de continuar.');
    }
  }
}
