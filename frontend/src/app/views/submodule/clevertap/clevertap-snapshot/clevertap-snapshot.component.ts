import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClevertapService } from '../service/clevertap.service';
import { tick } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, currentUser, Login } from '../../../../core/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { environment } from './../../../../../../src/environments/environment';
// import * as environment from '../../../../../assets/app-config.json';

import { SubheaderService } from '../../../../core/_base/layout';
import { HeaderService } from '../../../../core/_base/layout/services/header-service';

@Component({
  selector: 'kt-clevertap-snapshot',
  templateUrl: './clevertap-snapshot.component.html',
  styleUrls: ['./clevertap-snapshot.component.scss']
})
export class ClevertapSnapshotComponent implements OnInit {

  constructor(private clevertapService:ClevertapService,
    private datePipe:DatePipe,
    private store:Store<AppState>,
    private cdr:ChangeDetectorRef,
    private formbuilder:FormBuilder,
    private subheaderService:SubheaderService,
    private headerService:HeaderService) { }
chart;
apiData:any;
timeStamp=[]; 
today=[];
time=[];
todayData:any;
todayChart;
conversationtime=[];
conversation=[];
showTime=[];
totalCount:number=0;
activeUserData:any;
activeData=[];
activeDatatime=[];
activeChart;
campaign:any;
campaignLength:number;
bots:any;
botslength:number;
user$: Observable<User>;
activeUserLength=[];
activeUserLengthValue:number;
thisMonthDate=[];
status=0;
ngOnInit() {
  
  this.store.pipe(select(currentUser)).subscribe(user => {
    if (!!user) {
      this.user$=user;
      console.log(this.user$['activeApplication']._id);
      this.clevertapService.getCampainData(this.user$['activeApplication']._id).subscribe(data=>{
        this.campaign=data;
       this.campaignLength=this.campaign['data'].length;
       console.log(this.campaignLength);
       this.cdr.detectChanges();
      })
      this.clevertapService.getBots(this.user$['activeApplication']._id).subscribe(data=>{
        this.bots=data;
        this.botslength=this.bots['data'].length;
        console.log(this.botslength); 
        this.cdr.detectChanges();
           })
    }
    else {
      const userToken = localStorage.getItem(environment.authTokenKey);
      this.store.dispatch(new Login({ authToken: userToken }));
    }
  })
    var todayDate=new Date();
for(var i=7;i>0;i--){
  this.time.push(new Date(todayDate));
  todayDate.setDate(todayDate.getDate()-1);
}
this.time.reverse();
    this.clevertapService.getCleverTapData().subscribe(data=>
      {
      this.apiData=data;
      console.log(this.apiData)
      for(var i=0;i<this.time.length;i++){
        var count=0;
        let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
      for(var j=0;j<this.apiData.length;j++){

        var apiTime=this.apiData[j].timestamp.value.split("T");

        if(apiTime[0]==latest_date){
          count++
        }
      }
      this.today.push(count);
      this.totalCount=this.totalCount+count;
      this.showTime.push(latest_date);
      }
      console.log(this.today)
         this.chart = new Chart('ctx', {
          type: 'line',
          data: {
            labels:this.showTime,
            datasets:[
              {
                data:this.today,
                label:'users',
                borderColor:"#3cba9f",
                fill:true,
                backgroundColor: "#F5DEB3"
              },
             
          ]
          },
          options: {
            tooltips: {
              enabled: true,
              mode: 'label'
            },          
             legend: {
               display: true,
             },
             scales:{
               xAxes:[{
                 display:true,
               }],
               yAxes:[{
                 display:true,
                 scaleLabel: {
                  display: true,
                  labelString: 'new User'
                },
                 ticks: {
                  // max:219,
                  stepSize:1,
                  min:0, 
               },

               }]
             }
          }
      });
    })
    
    this.clevertapService.getCleverTapToday().subscribe(data=>{
      this.todayData=data;
      console.log(this.todayData);
      for(var i=0;i<this.time.length;i++){
        var count=0;
        let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
      for(var j=0;j<this.todayData.length;j++){
        var dailyConversationTime=this.todayData[j].timestamp.value.split("T");
        // console.log(apiTime[0],this.time[i])
        if(dailyConversationTime[0]==latest_date){
          count++
        }
      }
      this.conversation.push(count);
      this.conversationtime.push(latest_date)
      }
      this.todayChart = new Chart('today', {
        type: 'line',
        data: {
          labels:this.conversationtime,
          datasets:[
            {
              data:this.conversation,
              label:'conversation',
              borderColor:"blue",
              backgroundColor: "beige",
              fill:true
            },
        ]
        },
        options: {
          tooltips: {
            enabled: true,
            mode: 'label'
          },          
           legend: {
             display: true,
           },  
           scales:{
             xAxes:[{
               display:true
             }],
             yAxes:[{
               display:true,
               scaleLabel: {
                display: true,
                labelString: 'No Of Conversation'
              },
               ticks:{
                stepSize:20,
                min:0
               }
             }]
           }
        }
    });
    })

    this.clevertapService.getActiveUser().subscribe(data=>{
      this.activeUserData=data;
      for(var i=0;i<this.time.length;i++){
        var count=0;
        var groupId=[];
        let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
      for(var j=0;j<this.activeUserData.length;j++){
        var dailyConversationTime=this.activeUserData[j].timestamp.value.split("T");
        if(dailyConversationTime[0]==latest_date){
          if(!groupId.includes(this.activeUserData[j].groupId)){
           groupId.push(this.activeUserData[j].groupId);
           this.activeUserLength.push(this.activeUserData[j].groupId);
          count++;
          }
          
        }
      }
      this.activeData.push(count);
      this.activeDatatime.push(latest_date);
      this.activeUserLengthValue=this.activeUserLength.length;
      this.cdr.detectChanges();
      }
      this.activeChart = new Chart('active', {
        type: 'line',
        data: {
          labels:this.activeDatatime,
          datasets:[
            {
              data:this.activeData,
              label:'activeUser',
              borderColor:"green",
              backgroundColor: "beige",
              fill:true
            },
        ]
        },
        options: {
          tooltips: {
            enabled: true,
            mode: 'label'
          },          
           legend: {
             display: true,
           },  
           scales:{
             xAxes:[{
               display:true
             }],
             yAxes:[{
               display:true,
               scaleLabel: {
                display: true,
                labelString: 'No Of activeuser'
              },
               ticks:{
                stepSize:5,
                min:0
               }
             }]
           }
        }
    });
    })
   this.subheaderService.hideSubHeader(true);
		this.headerService.setHeaderTabs([]);
		this.loadSubheader();
  }
  loadSubheader() {

    this.subheaderService.setTitle('Report', false);
    this.subheaderService.setBreadcrumbs([
      { title: 'Dashboard', page: `/dashboard` },
      { title: 'Report' },

    ]);
    // this.headerService.setHeaderTabs(this.tabs)

  }
 
 
  thisMonthData(){
    if(this.chart!=undefined){
console.log('dbdsbds');
this.chart.destroy();
this.todayChart.destroy();
this.activeChart.destroy();
    }
    // this.todayChart=[];
    // this.activeChart=[];
    this.status=1;
    this.showTime=[];
    this.today=[];
    this.thisMonthDate=[];
    this.activeData=[];
    this.activeDatatime=[];
    this.conversation=[];
    this.conversationtime=[];
    this.activeUserLength=[];
    var dateToday=new Date();
    var y = dateToday.getFullYear();
    var m = dateToday.getMonth();
    var dateMonth=new Date(y,m,1);

    var todayMonth=dateMonth.getMonth()+1
    while (dateMonth.getMonth()+1===todayMonth) {
  this.thisMonthDate.push(new Date(dateMonth));
  dateMonth.setDate(dateMonth.getDate() + 1);
  }
  console.log(this.thisMonthDate)
  this.clevertapService.getMonthUser(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()).subscribe(data=>
    {
      var monthUser:any=data;
      console.log(monthUser)
      for(var i=0;i<this.thisMonthDate.length;i++){
        var count=0;
        let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
      for(var j=0;j<monthUser.length;j++){

        var apiTime=monthUser[j].timestamp.value.split("T");

        if(apiTime[0]==latest_date){
          count++
        }
      }
      this.today.push(count);
      this.totalCount=this.totalCount+count;
      this.showTime.push(latest_date);
      }
      console.log(this.today,this.showTime)
         this.chart = new Chart('ctx', {
          type: 'line',
          data: {
            labels:this.showTime,
            datasets:[
              {
                data:this.today,
                label:'users',
                borderColor:"#3cba9f",
                fill:true,
                backgroundColor: "#F5DEB3"
              },
             
          ]
          },
          options: {
            tooltips: {
              enabled: true,
              mode: 'label'
            },          
             legend: {
               display: true,
             },
             scales:{
               xAxes:[{
                 display:true,
                 ticks: {
                  // max:219,
                  // stepSize:3,
                  min:0, 
               },
               }],
               yAxes:[{
                 display:true,
                 scaleLabel: {
                  display: true,
                  labelString: 'new User'
                },
                 ticks: {
                  // max:219,
                  stepSize:1,
                  min:0, 
               },

               }]
             }
          }
      });
      
  });

  this.clevertapService.getMonthActiveUser(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()).subscribe(data=>{
    var monthactiveUserData:any=data;
    for(var i=0;i<this.thisMonthDate.length;i++){
      var count=0;
      var groupId=[];
      let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
    for(var j=0;j<monthactiveUserData.length;j++){
      var dailyConversationTime=monthactiveUserData[j].timestamp.value.split("T");
      if(dailyConversationTime[0]==latest_date){
        if(!groupId.includes(monthactiveUserData[j].groupId)){
         groupId.push(monthactiveUserData[j].groupId);
         this.activeUserLength.push(monthactiveUserData[j].groupId);
        count++;
        }
        
      }
    }
    this.activeData.push(count);
    this.activeDatatime.push(latest_date);
    this.activeUserLengthValue=this.activeUserLength.length;
    this.cdr.detectChanges();
    }
    this.activeChart = new Chart('active', {
      type: 'line',
      data: {
        labels:this.activeDatatime,
        datasets:[
          {
            data:this.activeData,
            label:'activeUser',
            borderColor:"green",
            backgroundColor: "beige",
            fill:true
          },
      ]
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'label'
        },          
         legend: {
           display: true,
         },  
         scales:{
           xAxes:[{
             display:true
           }],
           yAxes:[{
             display:true,
             scaleLabel: {
              display: true,
              labelString: 'No Of activeuser'
            },
             ticks:{
              stepSize:5,
              min:0
             }
           }]
         }
      }
  });
  })

  this.clevertapService.getMonthConversation(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()).subscribe(data=>{
    var monthConversation:any=data;
    for(var i=0;i<this.thisMonthDate.length;i++){
      var count=0;
      let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
    for(var j=0;j<monthConversation.length;j++){
      var dailyConversationTime=monthConversation[j].timestamp.value.split("T");
      // console.log(apiTime[0],this.time[i])
      if(dailyConversationTime[0]==latest_date){
        count++
      }
    }
    this.conversation.push(count);
    this.conversationtime.push(latest_date)
    }
    this.todayChart = new Chart('today', {
      type: 'line',
      data: {
        labels:this.conversationtime,
        datasets:[
          {
            data:this.conversation,
            label:'conversation',
            borderColor:"blue",
            backgroundColor: "beige",
            fill:true
          },
      ]
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'label'
        },          
         legend: {
           display: true,
         },  
         scales:{
           xAxes:[{
             display:true
           }],
           yAxes:[{
             display:true,
             scaleLabel: {
              display: true,
              labelString: 'No Of Conversation'
            },
             ticks:{
              stepSize:20,
              min:0
             }
           }]
         }
      }
  });
  })
  }

  lastWeekData(){
    if(this.chart!=undefined){
    this.chart.destroy();
this.todayChart.destroy();
this.activeChart.destroy();
}
    // this.chart=[];
    // this.todayChart=[];
    // this.activeChart=[];
    this.status=0;
    this.time=[];
    this.showTime=[];
    this.today=[];
    this.thisMonthDate=[];
    this.activeData=[];
    this.activeDatatime=[];
    this.conversation=[];
    this.conversationtime=[];
    this.activeUserLength=[];
    var todayDate=new Date();
    for(var i=7;i>0;i--){
      this.time.push(new Date(todayDate));
      todayDate.setDate(todayDate.getDate()-1);
    }
    this.time.reverse();
        this.clevertapService.getCleverTapData().subscribe(data=>
          {
          var lastWeekData:any=data;
          console.log(lastWeekData)
          for(var i=0;i<this.time.length;i++){
            var count=0;
            let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
          for(var j=0;j<lastWeekData.length;j++){
    
            var apiTime=lastWeekData[j].timestamp.value.split("T");
    
            if(apiTime[0]==latest_date){
              count++
            }
          }
          this.today.push(count);
          this.totalCount=this.totalCount+count;
          this.showTime.push(latest_date);
          }
          console.log(this.today)
             this.chart = new Chart('ctx', {
              type: 'line',
              data: {
                labels:this.showTime,
                datasets:[
                  {
                    data:this.today,
                    label:'users',
                    borderColor:"#3cba9f",
                    fill:true,
                    backgroundColor: "#F5DEB3"
                  },
                 
              ]
              },
              options: {
                tooltips: {
                  enabled: true,
                  mode: 'label'
                },          
                 legend: {
                   display: true,
                 },
                 scales:{
                   xAxes:[{
                     display:true,
                   }],
                   yAxes:[{
                     display:true,
                     scaleLabel: {
                      display: true,
                      labelString: 'new User'
                    },
                     ticks: {
                      // max:219,
                      stepSize:1,
                      min:0, 
                   },
    
                   }]
                 }
              }
          });
        })
        
        this.clevertapService.getCleverTapToday().subscribe(data=>{
          
          var lastWeekConversation:any=data;
          console.log(lastWeekConversation);
          for(var i=0;i<this.time.length;i++){
            var count=0;
            let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
          for(var j=0;j<lastWeekConversation.length;j++){
            var dailyConversationTime=lastWeekConversation[j].timestamp.value.split("T");
            // console.log(apiTime[0],this.time[i])
            if(dailyConversationTime[0]==latest_date){
              count++
            }
          }
          this.conversation.push(count);
          this.conversationtime.push(latest_date)
          }
          this.todayChart = new Chart('today', {
            type: 'line',
            data: {
              labels:this.conversationtime,
              datasets:[
                {
                  data:this.conversation,
                  label:'conversation',
                  borderColor:"blue",
                  backgroundColor: "beige",
                  fill:true
                },
            ]
            },
            options: {
              tooltips: {
                enabled: true,
                mode: 'label'
              },          
               legend: {
                 display: true,
               },  
               scales:{
                 xAxes:[{
                   display:true
                 }],
                 yAxes:[{
                   display:true,
                   scaleLabel: {
                    display: true,
                    labelString: 'No Of Conversation'
                  },
                   ticks:{
                    stepSize:20,
                    min:0
                   }
                 }]
               }
            }
        });
        })
    
        this.clevertapService.getActiveUser().subscribe(data=>{
          var lastWeekActiveUser:any=data;
          for(var i=0;i<this.time.length;i++){
            var count=0;
            var groupId=[];
            let latest_date =this.datePipe.transform(this.time[i], 'yyyy-MM-dd');
          for(var j=0;j<lastWeekActiveUser.length;j++){
            var dailyConversationTime=lastWeekActiveUser[j].timestamp.value.split("T");
            if(dailyConversationTime[0]==latest_date){
              if(!groupId.includes(lastWeekActiveUser[j].groupId)){
               groupId.push(lastWeekActiveUser[j].groupId);
               this.activeUserLength.push(lastWeekActiveUser[j].groupId);
              count++;
              }
              
            }
          }
          this.activeData.push(count);
          this.activeDatatime.push(latest_date);
          this.activeUserLengthValue=this.activeUserLength.length;
          this.cdr.detectChanges();
          }
          this.activeChart = new Chart('active', {
            type: 'line',
            data: {
              labels:this.activeDatatime,
              datasets:[
                {
                  data:this.activeData,
                  label:'activeUser',
                  borderColor:"green",
                  backgroundColor: "beige",
                  fill:true
                },
            ]
            },
            options: {
              tooltips: {
                enabled: true,
                mode: 'label'
              },          
               legend: {
                 display: true,
               },  
               scales:{
                 xAxes:[{
                   display:true
                 }],
                 yAxes:[{
                   display:true,
                   scaleLabel: {
                    display: true,
                    labelString: 'No Of activeuser'
                  },
                   ticks:{
                    stepSize:5,
                    min:0
                   }
                 }]
               }
            }
        });
        }) 
  }

  lastMonthData(){
    if(this.chart!=undefined){
      this.chart.destroy();
  this.todayChart.destroy();
  this.activeChart.destroy();
  }
    // this.chart=[];
    // this.todayChart=[];
    // this.activeChart=[];
    this.status=2;
    this.showTime=[];
    this.today=[];
    this.thisMonthDate=[];
    this.activeData=[];
    this.activeDatatime=[];
    this.conversation=[];
    this.conversationtime=[];
    this.activeUserLength=[];
    var dateToday=new Date();
    dateToday.setMonth(dateToday.getMonth()-1);
    console.log(dateToday);
    var y = dateToday.getFullYear();
    var m = dateToday.getMonth();
    var dateMonth=new Date(y,m,1);

    var todayMonth=dateMonth.getMonth()
    while (dateMonth.getMonth()===todayMonth) {
  this.thisMonthDate.push(new Date(dateMonth));
  dateMonth.setDate(dateMonth.getDate() + 1);
  }
  console.log(this.thisMonthDate)
  this.clevertapService.getMonthUser(dateToday.getDate(),dateToday.getMonth(),dateToday.getFullYear()).subscribe(data=>
    {
      this.apiData=data;
      console.log(this.apiData)
      for(var i=0;i<this.thisMonthDate.length;i++){
        var count=0;
        let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
      for(var j=0;j<this.apiData.length;j++){

        var apiTime=this.apiData[j].timestamp.value.split("T");

        if(apiTime[0]==latest_date){
          count++
        }
      }
      this.today.push(count);
      this.totalCount=this.totalCount+count;
      this.showTime.push(latest_date);
      }
      console.log(this.today,this.showTime)
         this.chart = new Chart('ctx', {
          type: 'line',
          data: {
            labels:this.showTime,
            datasets:[
              {
                data:this.today,
                label:'users',
                borderColor:"#3cba9f",
                fill:true,
                backgroundColor: "#F5DEB3"
              },
             
          ]
          },
          options: {
            tooltips: {
              enabled: true,
              mode: 'label'
            },          
             legend: {
               display: true,
             },
             scales:{
               xAxes:[{
                 display:true,
                 ticks: {
                  // max:219,
                  stepSize:3,
                  min:0, 
               },
               }],
               yAxes:[{
                 display:true,
                 scaleLabel: {
                  display: true,
                  labelString: 'new User'
                },
                 ticks: {
                  // max:219,
                  stepSize:1,
                  min:0, 
               },

               }]
             }
          }
      });
      
  });

  this.clevertapService.getMonthActiveUser(dateToday.getDate(),dateToday.getMonth(),dateToday.getFullYear()).subscribe(data=>{
    this.activeUserData=data;
    for(var i=0;i<this.thisMonthDate.length;i++){
      var count=0;
      var groupId=[];
      let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
    for(var j=0;j<this.activeUserData.length;j++){
      var dailyConversationTime=this.activeUserData[j].timestamp.value.split("T");
      if(dailyConversationTime[0]==latest_date){
        if(!groupId.includes(this.activeUserData[j].groupId)){
         groupId.push(this.activeUserData[j].groupId);
         this.activeUserLength.push(this.activeUserData[j].groupId);
        count++;
        }
        
      }
    }
    this.activeData.push(count);
    this.activeDatatime.push(latest_date);
    this.activeUserLengthValue=this.activeUserLength.length;
    this.cdr.detectChanges();
    }
    this.activeChart = new Chart('active', {
      type: 'line',
      data: {
        labels:this.activeDatatime,
        datasets:[
          {
            data:this.activeData,
            label:'activeUser',
            borderColor:"green",
            backgroundColor: "beige",
            fill:true
          },
      ]
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'label'
        },          
         legend: {
           display: true,
         },  
         scales:{
           xAxes:[{
             display:true
           }],
           yAxes:[{
             display:true,
             scaleLabel: {
              display: true,
              labelString: 'No Of activeuser'
            },
             ticks:{
              stepSize:5,
              min:0
             }
           }]
         }
      }
  });
  })

  this.clevertapService.getMonthConversation(dateToday.getDate(),dateToday.getMonth(),dateToday.getFullYear()).subscribe(data=>{
    this.todayData=data;
    for(var i=0;i<this.thisMonthDate.length;i++){
      var count=0;
      let latest_date =this.datePipe.transform(this.thisMonthDate[i], 'yyyy-MM-dd');
    for(var j=0;j<this.todayData.length;j++){
      var dailyConversationTime=this.todayData[j].timestamp.value.split("T");
      // console.log(apiTime[0],this.time[i])
      if(dailyConversationTime[0]==latest_date){
        count++
      }
    }
    this.conversation.push(count);
    this.conversationtime.push(latest_date)
    }
    this.todayChart = new Chart('today', {
      type: 'line',
      data: {
        labels:this.conversationtime,
        datasets:[
          {
            data:this.conversation,
            label:'conversation',
            borderColor:"blue",
            backgroundColor: "beige",
            fill:true
          },
      ]
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'label'
        },          
         legend: {
           display: true,
         },  
         scales:{
           xAxes:[{
             display:true
           }],
           yAxes:[{
             display:true,
             scaleLabel: {
              display: true,
              labelString: 'No Of Conversation'
            },
             ticks:{
              stepSize:20,
              min:0
             }
           }]
         }
      }
  });
  })
  }
}
