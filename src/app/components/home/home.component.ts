import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  items: MenuItem[] = [];
  activeItem: MenuItem = {};




  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'Data Load', icon: 'pi pi-fw pi-cog', routerLink: '/data' },
      { label: 'Forecast', icon: 'pi pi-fw pi-calendar', routerLink: '/forecast' },
      { label: 'Close', icon: 'pi pi-fw pi-pencil', routerLink: '/close' },
      { label: 'Report', icon: 'pi pi-fw pi-file', routerLink: '/report' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event:any){
    this.activeItem = event;
  }

}
