import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; // 导入 FormsModule&响应式表单

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { DonationComponent } from './donation/donation.component';
import { AdminComponent } from './admin/admin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UpdateDialogComponent } from './admin/update-dialog/update-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from './admin/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FundraiserComponent,
    DonationComponent,
    AdminComponent,
    UpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule ,
    MatDialogModule 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
