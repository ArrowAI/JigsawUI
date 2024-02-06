import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../service/messaging.service';
@Component({
  selector: 'kt-string-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class StringDropdownComponent implements OnInit {
  isSelected:true;
  constructor(private messagingService: MessagingService) { 

  }
  selectedOption=0;

  ngOnInit() {
    this.messagingService.sendMessage("0");
  }
  changeDropDown(type: any): void {
    this.messagingService.sendMessage(type);
  }

}
