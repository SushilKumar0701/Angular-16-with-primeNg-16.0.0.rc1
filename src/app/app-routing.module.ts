import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TreeTableComponent } from './components/tree-table/tree-table.component';
import { CloseListComponent } from './components/close-list/close-list.component';
import { HomeCloseComponent } from './components/home-close/home-close.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home-close', component: HomeCloseComponent },
  { path: 'forecast', component: TreeTableComponent },
  { path: 'close', component: CloseListComponent },
  { path: 'report', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
