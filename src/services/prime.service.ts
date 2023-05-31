import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PrimeService {

  baseUrl:string = "http://localhost:5000/"
  constructor(private httpClient: HttpClient) { }


  getQueryResponse(): Observable<any>{
    const post_data = {
      "client_id": 19,
      "query": localStorage.getItem('query'),
      'org_id': 19001,
      'user_id':1003
    };
    localStorage.removeItem('query')
    return this.httpClient.post(this.baseUrl + `/api/user_query_interface/`, post_data);
  }

  getCloseTreeGridData(): Observable<any> {
    // To fetch the close tree grid data
    const post_data = {
      "client_id": Number(localStorage.getItem('client_id')),
      "org_id": Number(localStorage.getItem('org_id')),
      "items": "1",
      "component_key": "close_snapshot_details",
      "calc_type": "CA",
      "download_attachment": "N",
      "item_level": 4,
      "snapshot_id": 1409,
      "frequency": "MONTHLY",
      "value_type_id": "1",
      "column": "Periods",
      "selected_period": 0,
    }
    return this.httpClient.post(this.baseUrl + `/api/gtnsnapshotgriddata/`, post_data)
  }

  // }
}
