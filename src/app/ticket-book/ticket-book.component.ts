import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constant } from '../services/constant-url/constant';
import { WebService } from '../services/web-services/web.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-book',
  templateUrl: './ticket-book.component.html',
  styleUrls: ['./ticket-book.component.scss']
})
export class TicketBookComponent implements OnInit {
  AddSeatForm: any;
  isCompleted: boolean=false;
  seatList: any=[];
  todayDate: any;
  username: any='admin@gmail.com';
  isValidFormSubmitted: any = null;
  msg: string='';
  status: boolean=false;
  
  constructor(
    private formBuilder: FormBuilder,
    private webService: WebService,
    public constant: Constant,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
  ) { 
    this.AddSeatForm=FormGroup;
    console.log(this.todayDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    
  }
  
  ngOnInit(): void {
    /** 
    for(let i=1;i<81; i++){
      this.seatList.push(i);
    }
    */

    this.AddSeatForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      seat: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.getAllSeat();
  }

  /** method: getAllSeat 
   *  param: username
   *  desc: used for booking seat
  */
   getAllSeat(){
    if(this.AddSeatForm.get('date').value!='' && this.AddSeatForm.get('date').value!=undefined && this.AddSeatForm.get('date').value!=null){
      this.todayDate=this.AddSeatForm.get('date').value;
    }
    if(this.AddSeatForm.get('email').value!='' && this.AddSeatForm.get('email').value!=undefined && this.AddSeatForm.get('email').value!=null){
      this.username=this.AddSeatForm.get('email').value;
    }
    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("date", this.todayDate);
    //console.log(this.username, this.todayDate);
    this.isCompleted=true;
    this.webService.postMethod(
      formData, this.constant.getSeat
      ).subscribe(response => {
        this.isCompleted=false;
        if(response.flag==true){
          this.isCompleted=false;
          this.seatList=response.seatList;
        }else{
          this.snackBar.open(response.msg, 'Ok', {
            duration: 3000
          });
        }
    },
      error => {
        console.log("ERROR", error)
      });
  }

  /** method: BookTicket 
   *  param: email, seat, date
   *  desc: used for booking seat
  */
  BookTicket(){
    this.isValidFormSubmitted = 0;
    if(this.AddSeatForm.invalid){
      this.snackBar.open("All field are mandatory", 'error', {
        duration: 3000
      });
      return
    }
    this.isValidFormSubmitted = 1;
    const formData = new FormData();
    formData.append("username", this.AddSeatForm.get('email').value);
    formData.append("seat", this.AddSeatForm.get('seat').value);
    formData.append("date", this.AddSeatForm.get('date').value);
    formData.append("steps_completed", "0");
    this.isCompleted=true;
    this.webService.postMethod(
      formData, this.constant.seatBooking
      ).subscribe(response => {
        this.isCompleted=false;
        if(response.flag==true){
          this.isCompleted=false;
          this.getAllSeat();
          this.snackBar.open(response.msg, '', {
            duration: 3000
          });
          this.status=response.flag;
          this.msg=response.msg;
        }else{
          this.status=response.flag;
          this.msg=response.msg;
          this.snackBar.open(response.msg, 'Ok', {
            duration: 3000
          });
        }
    },
      error => {
        console.log("ERROR", error)
      });
  }

}
