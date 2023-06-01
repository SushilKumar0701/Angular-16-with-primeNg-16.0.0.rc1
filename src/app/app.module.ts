import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeTableComponent } from './components/tree-table/tree-table.component';
import { CloseListComponent } from './components/close-list/close-list.component';
import { HomeComponent } from './components/home/home.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeCloseComponent } from './components/home-close/home-close.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TreeTableComponent,
    CloseListComponent,
    HomeComponent,
    HomeCloseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    TreeModule,
    TreeTableModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    TabMenuModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
