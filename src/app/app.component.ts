import { Component, OnInit, NgModule } from '@angular/core';
import { PrimeService } from '../services/prime.service';
import { NodeService } from '../services/nodeService';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  file: TreeNode[] = [];
  // selectedNode: TreeNode = 'xyz';

  constructor(
    private primeService: PrimeService,
    private nodeService: NodeService
  ){}

  defaultQuery = '';
  query:any = ''
  noteMessage = ''
  isqueryempty = false
  showDefaulToggle = false
  alertMessage:string = ''
  paginationPageSize = 100;
  columnDefs = [];
  responseColumns = [];
  queryResponseDetails:any = []
  headerValue:Array<string>=[]
  queryNotAllowed = [' into ', ' users_master'];
  defaultColDef = {
    resizable: true,
  };
  // private gridApi;
  // private gridColumnApi;
  rowData = [];
  cols: any[] = [];
  selectedNode:string ='xyz'
  data: any[] = [];
  columns: any[] = [];
  loading: boolean = false;
  gridResponse:boolean = false

  

  ngOnInit(): void {
    this.nodeService.getFilesystem().then((file) => (this.file = file));
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
    console.log("cols=",this.cols)
    this.getQueryResponseData('N')
    localStorage.setItem('client_id','19')
    localStorage.setItem('org_id','19001')
    localStorage.setItem('user_id','1003')
    // localStorage.setItem('query',this.query)
  }

  defaultToggleChanges(){
    this.queryResponseDetails = []
  }
  nodeSelect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
  }

  nodeUnselect(event:any) {
    // this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
  }

  getQueryResponseData(is_excel : String) {
    if(this.query.length > 0){
      const words = this.query.trim().split(' ');
      if (words[0].toLowerCase() === 'select' && !(this.queryNotAllowed.some(keys => this.query.toLowerCase().includes(keys.toLowerCase())))){
        let post_data = {}
        this.primeService.getQueryResponse().subscribe(
          (response) => {
            this.queryResponseDetails = response['RESPONSE']
            console.log(this.queryResponseDetails)
            this.rowData = response['RESPONSE'];
          },
        );
      }
      else{
        this.columnDefs = []
        this.rowData = []
        this.queryResponseDetails = []
      }
    }
    else{
      this.columnDefs = []
      this.rowData = []
      this.queryResponseDetails = []
    }
  }
  primeNGResponse(){
    if(this.query.length > 0){
      let post_data:any = {}
      post_data['client_id'] = 19;
      post_data['user_id'] = 1003;
      post_data['org_id'] = 19001;
      post_data['query'] = this.query;
      this.primeService.getQueryResponse().subscribe(
        (response) => {
        // Process the response to match the p-treetable data structure
        console.log("response ", response)
        this.data = response['RESPONSE'].map((item:any) => {
          // Adjust the property names and structure to match your API response
          return {
            data: item
            // children: item.children.map(child => {
            //   return {
            //     label: child.snapshot_name,
            //     data: child,
            //     children: [] // Adjust if children have further nested levels
            //   };
            // }),
          };
        });

        // Generate dynamic columns based on the response
        this.columns = Object.keys(response['RESPONSE'][0]).map(key => ({
          field: key,
          header: key // You can customize the header text if needed
        }));
      });
    }
    else{
      console.log("No records")
      this.columns = []
      this.data = []
    }
  }
  onValueChange(event:Event){
    // console.log(event.target)
    const value = (event.target as any).value;
    this.query = value;
    console.log(this.query)
    localStorage.setItem('query',this.query)
  }
  executeQueryButton(){
    // this.query = this.defaultQuery
    console.log("query ", this.query)
    if(this.query.length == 0){
        this.isqueryempty = true
    }
    else{
        this.isqueryempty = false
    }
    // this.query = 'SELECT * FROM CLIENT_MASTER'
    console.log(this.query)
    // this.getQueryResponseData('N')
    this.primeNGResponse()
  }

  getCloseTreeGridData() {
    this.loading = true;

    this.primeService.getCloseTreeGridData().subscribe(
    (response) => {
    // Process the response to match the p-treetable data structure
    console.log("response ", response)
    this.gridResponse = true
      
    
    setTimeout(() => {
      console.log("gridresponse ", this.gridResponse)
      if(this.gridResponse){
        this.loading = false
      }
    }, 100);
    });
  }
}
