import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService, ErrorState } from '../../../services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="error" class="alert" [ngClass]="getAlertClass()" role="alert">
      <div class="d-flex justify-content-between align-items-center">
        <span>{{ error.message }}</span>
        <button type="button" class="btn-close" (click)="clearError()"></button>
      </div>
      <small class="text-muted" *ngIf="showTimestamp">
        {{ error.timestamp | date:'medium' }}
      </small>
    </div>
  `,
  styles: [`
    .alert {
      margin-bottom: 1rem;
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ErrorAlertComponent implements OnInit, OnDestroy {
  error: ErrorState | null = null;
  showTimestamp = true;
  private subscription: Subscription | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.subscription = this.errorService.getErrors().subscribe(error => {
      this.error = error;
      if (error) {
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          if (this.error?.timestamp === error.timestamp) {
            this.clearError();
          }
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clearError(): void {
    this.errorService.clearError();
  }

  getAlertClass(): string {
    if (!this.error) return '';
    
    switch (this.error.type) {
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-secondary';
    }
  }
} 