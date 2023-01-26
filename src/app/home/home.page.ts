import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import Reservation from '../models/Reservation';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedCar: string = "default";
  carTypes: {id:number, type:string}[] = [
    {id: 1, type:"Sedan"},
    {id: 2, type:"SUV"},
  ];
  reserveDate: string = "";
  reserveHours: number = 1;
  carSeat: boolean = false;
  error: boolean = false;
  reserveID:number = 0;

  constructor(private router:Router,) {}

  validateDate = (): boolean =>{
    let date: moment.Moment = moment(this.reserveDate);
    return date.isValid();
  }

  validateBackDate = (): boolean => {
    let date: moment.Moment = moment(this.reserveDate);
    return date >= moment().startOf('day');
  }

  evaluateError = (): void => {
    this.error = !this.validateDate() || 
                  !this.validateBackDate() || 
                  (this.reserveHours < 0 || this.reserveHours > 96);
  }

  resetForm = (): void => {
    this.error = false;

    this.reserveDate = "";
    this.selectedCar = "default";
    this.reserveHours = 1;
    this.carSeat = false;

  }

  onSubmit = (): void => {

    this.evaluateError();

    if(!this.error){

      //random 4 digit number from 0-9999
      this.reserveID = Math.floor(Math.random() * 9999);

      let reservation:Reservation = {
      reservationID: this.reserveID,
      carType: this.selectedCar,
      reservationDate: this.reserveDate,
      reservationHours: this.reserveHours,
      carSeat: this.carSeat
      }

      let navigationExtras:NavigationExtras = {
      queryParams: {
          reso: JSON.stringify(reservation)
        }
      }

      this.router.navigate(["/receipt"], navigationExtras);
    } 

  }

}
