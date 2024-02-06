import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError, debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
// import { CampaignService } from './../../../../../src/app/core/campaign';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../../core/reducers';
import { currentUser, Login } from '../../../core/auth';
// import { environment } from './../../../../../src/environments/environment.prod';
import * as environment from '../../../../assets/app-config.json';

import { CommonService } from '../../../core/common/common.service';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';


@Component({
  selector: 'kt-send-campaign-dialog',
  templateUrl: './send-user-message.component.html',
  styleUrls: ['./send-user-message.component.scss']
})
export class SendUserMessageComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  userCtrl = new FormControl();

  filteredUser: Observable<any[]>;
  isLoading = false;
  selectedUser = [
  ];

  user$;
  allIntegration = [];
  allAddedIntegration = []
  componentType = ['List', 'Text', 'Video', 'Card', 'Image'];
  campaign: any = {
    type: '',
    segment: { name: '' },
    userSegmentType: 'Users',
    when: { dates: [{ date: '', time: '' }], start: 'now', end: 'neverEnd' },

    channel: '',
    integrationId: '',
    what: {
      component: '',
      list: [],
      card: [],
      text: '',
      video: '',
      image: {},
      document: {},
      audio: {}
    },
    who: { users: [] }

  };
  @ViewChild('userInput', { static: false }) userInput: ElementRef;

  constructor(
    // private campaignService: CampaignService,

    private integrationSerice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef: MatDialogRef<SendUserMessageComponent>,
    private cdr: ChangeDetectorRef) {
    this.filteredUser = this.userCtrl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // tap(() => {
      //   this.isLoading = true;
      // }),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '' && value != null) {
          // lookup from github
          return this.lookup(value);

        } else {
          // if no value is present, return null
          return of(null);
        }
      }),
      // finalize(() => {
      //   this.isLoading = false
      // }),

    )
  }
  ngOnInit() {
    console.log(this.data.campaign);
    this.campaign = this.data.campaign;
    this.campaign.userSegmentType ='Users',
      this.getAllIntegrations();
    this.store.pipe(select(currentUser)).subscribe(user => {
      this.user$ = user;
      if (!!user) {
        this.allAddedIntegration = []
        this.integrationSerice.getAllIntegrations().subscribe(integrations => {
          let addedIntegrations = user.activeApplication.integration || {};
          // this.allAddedIntegration=addedIntegrations;
          console.log(addedIntegrations);
          for (const key in addedIntegrations) {
            if (addedIntegrations.hasOwnProperty(key)) {
              const integrationId = addedIntegrations[key];
              for (const integrationKey in integrationId) {
                if (integrationId.hasOwnProperty(integrationKey)) {
                  this.allAddedIntegration.push({
                    name: integrationId[integrationKey].name,
                    integrationKey,
                    type: key,
                    icon: !!integrations.find(x => x.name == key) ? integrations.find(x => x.name == key).icon : ''
                  })
                }
              }
            }
          }
          console.log(this.allAddedIntegration);


          this.cdr.detectChanges();

        })
      }
      else {
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.store.dispatch(new Login({ authToken: userToken }));
      }

    });

  }
  selectComponent(event: any) {
    let component = event.target.value;

    this.campaign.what.component = component;
    if (component === 'text') {

    }
    else if (component.toLowerCase() == 'list') {
      this.campaign.what.list = [
        {
          "buttons": [],
          "description": "",
          "image": "",
          "title": "",
          "url": ""
        }, {
          "buttons": [],
          "description": "",
          "image": "",
          "title": "",
          "url": ""
        }
      ]
    }
    else if (component.toLowerCase() == 'video') {

    }
    else if (component.toLowerCase() == 'card') {
      this.campaign.what.card.push({
        "buttons": [],
        "description": "",
        "image": "",
        "title": "",
        "url": ""
      })
    }
    else if (component == 'image') {
      this.campaign.cpo

    }
    else if (component == 'audio') {

    }
    else {

    }
  }
  getAllIntegrations() {
    this.isLoading = true;
    this.integrationSerice.getAllIntegrations().subscribe(integrations => {
      //   console.log(integrations)
      this.allIntegration = integrations;// this.user$.integration;
      this.isLoading = false;
    })

  }
  hideLoading() {
    this.isLoading = false
  }
  lookup(value: any): Observable<any> {

    let filter = { filter: { "data.name": { $regex: `^${value.toLowerCase()}.*`, $options: 'si' } } }
    console.log(this.user$['activeApplication'])
    return this.integrationSerice.search(filter, this.user$['activeApplication']._id, this.user$.accessToken).pipe(

      // map the item property of the github results as our return object
      map(results => results.data),

      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedUser.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }


  remove(user: any): void {
    console.log(user);
    // const index = this.campaign.who.users.indexOf(user);
    const index = this.campaign.who.users.findIndex(x => x.id === user.id);
    if (index >= 0) {
      this.campaign.who.users.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event)
    this.campaign.who.users.push({ name: event.option.viewValue, _id: event.option.value });
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }
  sendMessage() {
  
   
    this.campaign.channel =this.allAddedIntegration.find(integration => integration.integrationKey == this.campaign.integrationId).type||'web'
    this.campaign.applicationId = this.user$['activeApplication']._id;
    this.integrationSerice.sendComponents(this.campaign).subscribe(data => {
      const message = `Message sent`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
      this.dialogRef.close();



    })
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */