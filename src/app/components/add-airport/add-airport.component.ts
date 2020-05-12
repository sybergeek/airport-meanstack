import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface HubFor {
  name: string;
}

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})

export class AddAirportComponent implements OnInit {
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
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private airportApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
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
  remove(subject: HubFor): void {
    const index = this.hubforArray.indexOf(subject);
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

  /* Submit book */
  submitAirportForm() {
    if (this.airportForm.valid) {
      this.airportApi.AddAirport(this.airportForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/airports-list'))
      });
    }
  }

}