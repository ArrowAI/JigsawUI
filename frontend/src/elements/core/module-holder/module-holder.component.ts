import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kt-module-holder',
  templateUrl: './module-holder.component.html',
  styleUrls: ['./module-holder.component.scss']
})
export class ModuleHolderComponent implements OnInit {
  constructor() { }
  @Output()
  valueChangedEvent = new EventEmitter<any>();
  ngOnInit() {
    this.valueChangedEvent.emit({})
  }
  valueChanged(e){
    console.log(e)
  }

}
