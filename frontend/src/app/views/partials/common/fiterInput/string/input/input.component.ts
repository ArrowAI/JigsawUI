import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../service/messaging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kt-string-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class StringInputComponent implements OnInit {
  dropdown: any = {};
  subscription: Subscription;
  constructor(private messagingService: MessagingService) { 
    this.subscription = this.messagingService.getMessage().subscribe(message => { 
      console.log(message)
      this.dropdown = message; 
    })
  }


  ngOnInit() {
    this.loadScript('../../../../../../../../assets/js/pages/crud/forms/widgets/tagify.js')
    //assets/js/pages/crud/forms/widgets/tagify.js
  }
 
 
   public loadScript(url: string) {
     const body = <HTMLDivElement> document.body;
     const script = document.createElement('script');
     script.innerHTML = '';
     script.src = url;
     script.async = false;
     script.defer = true;
     body.appendChild(script);
   }
 
 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
