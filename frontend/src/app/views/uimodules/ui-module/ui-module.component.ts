import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  SubheaderService } from '../../../core/_base/layout';
import { CommonService } from './../../../core/common/common.service';

@Component({
  selector: 'kt-ui-module',
  templateUrl: './ui-module.component.html',
  styleUrls: ['./ui-module.component.scss']
})
export class UiModuleComponent implements OnInit {


	private application;
	modules = [];
	installed = [];
	constructor(


		private commonService: CommonService,
    private subheaderService:SubheaderService,
		// private appComponent: AppComponent,
		private router: Router,

	) {
	}

	ngOnInit() {
		this.setTitle();
		this.setBreadcrumbs();
    this.hideSubheader();
		this.commonService.getElementList().subscribe(response => {
			this.modules = response.data;

		})
	}
	setTitle() {
    this.subheaderService.setTitle('Marketplace');
	
	}
  hideSubheader(){
    this.subheaderService.hideSubHeader(true);
  }
	setBreadcrumbs() {
	

    this.subheaderService.setBreadcrumbs([
      { title: 'Home', page: `/Home` },
      // { title: 'Title 2', page: `/url` },
    ])
	}
	addModule(module) {
	
	}
}
