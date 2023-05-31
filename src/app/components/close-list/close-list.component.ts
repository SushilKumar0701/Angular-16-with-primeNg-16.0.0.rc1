import { Component, OnInit } from '@angular/core';
import { PrimeService } from '../../../services/prime.service';

@Component({
  selector: 'app-close-list',
  templateUrl: './close-list.component.html',
  styleUrls: ['./close-list.component.scss']
})
export class CloseListComponent implements OnInit{


  constructor(
    private primeService: PrimeService,
  ){}

  loading: boolean = false;
  gridResponse:boolean = false


  ngOnInit(): void {}

  getCloseListGrid(){
    this.loading = true;

    this.primeService.getCloseListGridData().subscribe(
    (response) => {
      console.log("response ", response)
      this.gridResponse = true


    setTimeout(() => {
      if(this.gridResponse){
        this.loading = false
      }
    }, 100);
    },
    (error) => {
      this.gridResponse = true
      setTimeout(() => {
        if(this.gridResponse){
          this.loading = false
        }
      }, 100);
    });
  }
}
