import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import Reservation from '../models/Reservation';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  subtotal: number = 0;

  reservation: Reservation = {
    reservationID: 0,
    carType: '',
    reservationDate: '',
    reservationHours: 0,
    carSeat: false
  };

  constructor(private route:ActivatedRoute) { 

    this.route.queryParams.subscribe(params => {
      if(params && "reso" in params){
        this.reservation = JSON.parse(params["reso"]);
      }
    });

  }

  calculateSubtotal = () =>{
    switch(true){
      case this.reservation.carType == "Sedan" && this.reservation.reservationHours >= 24:
        this.subtotal = 70 * Math.ceil(moment.duration(this.reservation.reservationHours, 'hours').asDays()); 
        break;
      case this.reservation.carType == "Sedan" && this.reservation.reservationHours < 24:
        this.subtotal = 7 * this.reservation.reservationHours;
        break;
      case this.reservation.carType == "SUV" && this.reservation.reservationHours >= 24:
        this.subtotal = 100 * Math.ceil(moment.duration(this.reservation.reservationHours, 'hours').asDays());
        break;
      case this.reservation.carType == "SUV" && this.reservation.reservationHours < 24:
        this.subtotal = 12 * this.reservation.reservationHours;
        break;
    }

    if(this.reservation.carSeat){
      this.reservation.reservationHours >= 24 ? 
        this.subtotal += (10 * Math.ceil(moment.duration(this.reservation.reservationHours, 'hours').asDays())) :
        this.subtotal += (1 * this.reservation.reservationHours);
    }
  }

  ngOnInit() {
    this.reservation.reservationDate = moment(this.reservation.reservationDate).format('YYYY-MM-DD');
    this.calculateSubtotal();
  }

}
