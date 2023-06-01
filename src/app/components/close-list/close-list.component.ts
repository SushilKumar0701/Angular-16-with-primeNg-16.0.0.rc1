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
  data: any[] = [];
  homeCloseCols: any[] = []


  ngOnInit(): void {}
  getColumnDef(){
    this.homeCloseCols = [
      {headerName: 'Alert', field: 'alert'},
      {headerName: 'Snapshot Name', field: 'snapshot_name'},
      {headerName: 'Status', field: 'calc_status'},
      {headerName: 'Default', field: 'is_default'},
      {headerName: 'Last Calculated On', field: '_last_updated_on'},
      {headerName: 'Last Calculated By', field: '_last_updated_by'},
      {headerName: 'Actions', field: 'action'},
    ]
  }

  getCloseListGrid(){
    this.loading = true;
    this.getColumnDef()

    this.primeService.getCloseListGridData().subscribe(
    (response) => {
      console.log("response ", response)
      this.gridResponse = true

      console.log("close grid column ", this.homeCloseCols)

      // Process the response to match the p-treetable data structure
      this.data = response.map((item:any) => {
        // Adjust the property names and structure to match your API response
        return {
          data: item
        };
      });



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

  recalculateSnapshots(){
    console.log("Recalculate Button clicked")
  }

  deleteSnapshots(){
    console.log("Delete button clicked")
  }
}
