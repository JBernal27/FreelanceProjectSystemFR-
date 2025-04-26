import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectCardComponent } from './views/dashboard/components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ModalCreateComponent } from './views/dashboard/components/modal-create/modal-create.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, DashboardComponent, ModalCreateComponent],
  imports: [FormsModule, BrowserModule, AppRoutingModule, ReactiveFormsModule, ProjectCardComponent, CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
