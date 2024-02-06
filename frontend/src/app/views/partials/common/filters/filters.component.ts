import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showHideFiltes(isChecked :boolean,id){
    return !isChecked;

  }
  

}
