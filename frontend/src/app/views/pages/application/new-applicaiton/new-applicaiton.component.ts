import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, Inject } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
//import { User } from '../../material/formcontrols/autocomplete/autocomplete.component';
import { AppState } from '../../../../core/reducers';
import { currentUser, User, Login, UserRequested } from '../../../../core/auth';
import { Store, select } from '@ngrx/store';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
// import { environment } from './../../../../../environments/environment';
import * as environment from '../../../../../assets/app-config.json';

import { ApplicaitonService } from '../../../../core/application/applicaiton.service';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud';

@Component({
  selector: 'kt-new-applicaiton',
  templateUrl: './new-applicaiton.component.html',
  styleUrls: ['./new-applicaiton.component.scss']
})
export class NewApplicaitonComponent implements OnInit {
  user$: Observable<User>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  applicationForm: FormGroup;
  hasFormErrors: boolean = false;
  showPage: boolean = false;

  @ViewChild('tagsInput', { static: false }) tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  /**
 *
 * @param subheaderService: SubheaderService
 */
  constructor(public dialogRef: MatDialogRef<NewApplicaitonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subheaderService: SubheaderService,
    private store: Store<AppState>,
    private applicationFB: FormBuilder,
    private applicationServe: ApplicaitonService,
    private layoutUtilsService:LayoutUtilsService
  ) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tags: string | null) => tags ? this._filter(tags) : this.allTags.slice()));
  }
  application = {};
  ngOnInit() {
    console.log("loaded")
    this.createForm();
    this.store.pipe(select(currentUser)).subscribe(user => {
      this.user$ = user;
      if (!!user) {
      }
      else {
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.store.dispatch(new Login({ authToken: userToken }));

      }

    })
    this.loadSubheader()
  }

  loadSubheader() {
    this.subheaderService.setTitle('Settings');
    this.subheaderService.setBreadcrumbs([
      { title: 'settings', page: `/settings` },
      { title: 'AppLication Setting', page: `/appsettings/applicationSetting/view` }
    ]);
    this.subheaderService.setActionButtons([
      //   { title: 'Add Key', page: `/appsettings/applicationSetting/add`,icon:"la la-arrow-left" }
    ])
  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagsCtrl.setValue(null);
    }
  }
  createForm() {
    this.showPage = true;
    this.applicationForm = this.applicationFB.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // tags: [''],
    });
  }


  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  submitform() {
    this.hasFormErrors = false;
    const controls = this.applicationForm.controls;
    /** check form */
    if (this.applicationForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;

      // this.nameInput.focus();
      console.log("invalid")
      return;
    }

    const _applicaiton = {};
    _applicaiton['name'] = controls['name'].value;
    _applicaiton['description'] = controls['description'].value;
    _applicaiton['tags'] = this.allTags;

    this.applicationServe.addApplication(_applicaiton).subscribe(data => {
      this.layoutUtilsService.showActionNotification(`New Application ${_applicaiton['name']} added `, MessageType.Create, 5000, true, true);
     
      this.dialogRef.close(data);
    })
  }



}





