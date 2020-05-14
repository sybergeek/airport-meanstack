import { Airport } from './../../shared/airport';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css']
})

export class AirportsListComponent implements OnInit {
  AirportData: any = [];
  dataSource: MatTableDataSource<Airport>;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'airport_name', 'airport_code', 'airport_address', 'action'];

  constructor(private airportApi: ApiService) {
    this.airportApi.GetAirports().subscribe(data => {
      this.AirportData = data;
      this.dataSource = new MatTableDataSource<Airport>(this.AirportData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteAirport(index: number, e){
    if(window.confirm('Are you sure ?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.airportApi.DeleteAirport(e._id).subscribe()
    }
  }

}