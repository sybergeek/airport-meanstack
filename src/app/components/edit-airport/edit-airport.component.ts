import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface HubFor {
  name: string;
}

@Component({
  selector: 'app-edit-airport',
  templateUrl: './edit-airport.component.html',
  styleUrls: ['./edit-airport.component.css']
})

export class EditAirportComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static: true}) chipList;
  @ViewChild('resetAirportForm',{static: true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  airportForm: FormGroup;
  hubforArray: HubFor[] = [];
  // SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private airportApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.airportApi.GetAirport(id).subscribe(data => {
      console.log(data.hub_for)
      this.hubforArray = data.hub_for;
      this.airportForm = this.fb.group({
        airport_name: [data.airport_name, [Validators.required]],
        airport_code: [data.airport_code, [Validators.required]],
        airport_address: [data.airport_address, [Validators.required]],
        hub_for: [data.hub_for],
        date_opened: [data.date_opened, [Validators.required]],
        airport_type: [data.airport_type]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.airportForm = this.fb.group({
      airport_name: ['', [Validators.required]],
      airport_code: ['', [Validators.required]],
      airport_address: ['', [Validators.required]],
      hub_for: [this.hubforArray],
      date_opened: ['', [Validators.required]],
      airport_type: ['Domestic']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.hubforArray.length < 5) {
      this.hubforArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(hubfor: HubFor): void {
    const index = this.hubforArray.indexOf(hubfor);
    if (index >= 0) {
      this.hubforArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.airportForm.get('date_opened').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.airportForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateAirportForm() {
    console.log(this.airportForm.value);
    console.log('entering updateAirportForm()');
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.airportApi.UpdateAirport(id, this.airportForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/airports-list'))
      });
    }
  }
  
}