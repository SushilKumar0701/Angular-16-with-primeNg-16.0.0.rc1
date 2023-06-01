import { Component, OnInit } from '@angular/core';
import { PrimeService } from '../../../services/prime.service';
import { TreeNode } from 'primeng/api';

interface Category {
  category_id: number;
  line_id: number;
  line_name: string;
  close_value: Number;
  ta_value: Number;
  pa_value: Number;
  bs_value: Number;
  sub_total: Number;
  pos_accrual: Number;
  total: Number;
  children?: Category[];
}
@Component({
  selector: 'app-home-close',
  templateUrl: './home-close.component.html',
  styleUrls: ['./home-close.component.scss']
})
export class HomeCloseComponent implements OnInit{

  constructor(
    private primeService: PrimeService,
  ){}

  loading: boolean = false;
  gridResponse:boolean = false
  data: any[] = [];
  homeCloseCols: any[] = []
  categories: Category[] = [];
  resizableFlag = true
  frozenCols: any[] = [];
  selectedNodes: TreeNode[] = [];


  ngOnInit(): void {
    
  }
  getColumnDef(){
    this.homeCloseCols = [
      {headerName: 'Close', field: 'close_value',resizable: this.resizableFlag, type: 'rightAligned', color:'red',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'True Up', field: 'ta_value',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'Pipeline', field: 'pa_value',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'Balance Sheet', field: 'bs_value',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'Sub Total', field: 'sub_total',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'POS Accrual', field: 'pos_accrual',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }},
      {headerName: 'Total', field: 'total',resizable: this.resizableFlag, type: 'rightAligned',
      cellRenderer: (params:any) => {
        return this.formatGridValues(params.value)
      }}
    ]
  }

  getHomeCloseGrid(){
    this.loading = true;
    this.getColumnDef()
    this.formatTreeTableGrid()

    this.primeService.getHomeCloseGridData().subscribe(
    (response) => {
      console.log("response ", response)
      this.gridResponse = true
      console.log("Columns ", this.homeCloseCols)

      
      const categoryData: Category[] = []
      response.forEach((item:any) => {
        const category ={
          category_id: item.category_id, 
          line_id: item.line_id, 
          line_name: item.line_name,
          close_value: item.close_value,
          ta_value: item.ta_value,
          pa_value: item.pa_value,
          bs_value: item.bs_value,
          sub_total: item.sub_total,
          pos_accrual: item.pos_accrual,
          total:item.total
        }
        categoryData.push(category)
      });
      this.categories = this.buildCategoryTree(categoryData, 0);
      console.log(this.categories)

      // Process the response to match the p-treetable data structure
      this.data = this.transformData(this.categories)
      console.log(this.data)
      
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
  
  transformData(items: any[]): any[] {
    const transformedData: any[] = [];

    items.forEach((item: any) => {
      const transformedItem: any = {
        data: item,
        children: item.children ? this.transformData(item.children) : []
      };

      transformedData.push(transformedItem);
    });

    return transformedData;
  }

  buildCategoryTree(categories: Category[], parentId: number): Category[] {
    const tree: Category[] = [];
    categories.forEach(category => {
      if (category.category_id === parentId) {
        const children = this.buildCategoryTree(categories, category.line_id);
        if (children.length) {
          category.children = children;
        }
        tree.push(category);
      }
    });
    return tree
  }

  formatTreeTableGrid(){
    this.frozenCols = [{ field: 'line_name', headerName: 'GTN Channel Name' }];
  }

  formatGridValues(value:any){
    console.log("Values ", value)
    return (typeof(value) != 'string' && value != null ) ? (value >= 0 ? ('$'+value.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})) : (`<span class="custom-grid-css">($`+Math.abs(value).toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})+`)</span>`)) : value
  }
}
