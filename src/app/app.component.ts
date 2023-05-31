import { Component, OnInit, NgModule } from '@angular/core';
import { PrimeService } from '../services/prime.service';
import { NodeService } from '../services/nodeservice';
import { TreeNode, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  file: TreeNode[] = [];
  // selectedNode: TreeNode = 'xyz';

  constructor(
    private primeService: PrimeService,
    private nodeService: NodeService,
    private messageService: MessageService
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
  selectedNode:any[] = []
  data: any[] = [];
  columns: any[] = [];
  loading: boolean = false;
  gridResponse:boolean = false
  isUserQueryInterface:boolean = false
  isCloseSnapshots:boolean = false
  closeGridColumns: any[] = []

  

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
    console.log("event ", event)
    console.log("event.node ", event.node)
    console.log("event.node.data ", event.node)
    console.log("event.node.data.name ", event.node.data.line_id)
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.line_id  });
  }

  nodeUnselect(event:any) {
    console.log("event ", event)
    console.log("event.node ", event.node)
    console.log("event.node.data ", event.node)
    console.log("event.node.data.name ", event.node.data.line_id)
    this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.line_id });
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
    this.isUserQueryInterface = true
    this.isCloseSnapshots = false
    console.log("is grid visible ", this.isUserQueryInterface)
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
    this.isUserQueryInterface = false
    this.isCloseSnapshots = true
    console.log("is grid visible ", this.isUserQueryInterface)
    this.loading = true;

    this.primeService.getCloseTreeGridData().subscribe(
    (response) => {
    // Process the response to match the p-treetable data structure
    console.log("response ", response)
    this.gridResponse = true

    // Generate dynamic columns based on the response
    this.closeGridColumns = Object.keys(response['result'][0]).map(key => ({
      field: key,
      header: key == 'line_name' ? 'GTN Channel Name':key // You can customize the header text if needed
    }));
    console.log("close grid column ", this.closeGridColumns)

    // Process the response to match the p-treetable data structure
    this.data = response['result'].map((item:any) => {
      // Adjust the property names and structure to match your API response
      return {
        data: item
      };
    });

    // Bind category and lines
    const categoryMap = new Map();
    // Create a map of categories using category_id as the key
    response['result'].forEach((item:any) => {
      const category = {
        id: item.category_id,
        name: item.line_name,
        children: []
      };

      categoryMap.set(item.category_id, category);
    });
    console.log("CategoryMap ", categoryMap)

    

    // Populate the children of each category
    // response['result'].forEach((item:any) => {
    //   const category = categoryMap.get(item.category_id);

    //   if (category && item.line_id !== item.category_id) {
    //     const line = {
    //       id: item.line_id,
    //       name: item.line_name
    //     };

    //     category.children.push(line);
    //   }
    // });

    // // Find the root categories (categories without a parent)
    // const rootCategories = Array.from(categoryMap.values()).filter(category => !categoryMap.has(category.id));

    // this.data = rootCategories;

    // console.log("Data ", this.data)


      
    

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
