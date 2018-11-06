import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../ticket.service';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  titleStr: string;
  descriptionStr: string;
  geoLatStr: string;
  geoLngStr: string;
  photoStr: string;
  photoErr: boolean;
  showVideo: boolean;
  showSnapshot: boolean;
  camStream: HTMLVideoElement;
  snapshot: HTMLImageElement;

  constructor(public ticketService: TicketService) {
  }

  ngOnInit() {
  }

  addTicketToDb() {
    this.ticketService.addTicket({
      title: this.titleStr,
      description: this.descriptionStr,
      photo: this.photoStr,
      geoLat: this.geoLatStr,
      geoLng: this.geoLngStr,
      hide: true
    });
    if (navigator.vibrate) {
      navigator.vibrate(300);
    }
  }

  geoSuccess(position) {
    console.log("Setting Geolocation: " + this.geoLatStr + ", " + this.geoLngStr);
    this.geoLatStr = position.coords.latitude;
    this.geoLngStr = position.coords.longitude;
    this.addTicketToDb();
    this.geoSetDefault();
  }

  geoFailure() {
    this.addTicketToDb();
    this.geoSetDefault();
  }

  geoSetDefault() {
    this.geoLatStr = '';
    this.geoLngStr = '';
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoFailure.bind(this));
    } else {
      console.log("Geolocation not supported");
      this.addTicketToDb();
      this.geoSetDefault();
    }
  }

  addTicket(newTitle: HTMLInputElement, newDescription: HTMLInputElement) {
    this.titleStr = newTitle.value;
    this.descriptionStr = newDescription.value;
    this.getLocation();
    newTitle.value = '';
    newDescription.value = '';
    this.geoSetDefault();
    //this.snapshot.style.display = "none";
    this.showSnapshot = false;
    return false;
  }

  videoSuccess(stream) {
    this.camStream.src = window.URL.createObjectURL(stream);
    this.camStream.play();
    this.camStream.onplay = this.playVideo.bind(this);
  }

  playVideo() {
    this.showVideo = false;
  }

  videoFailure() {
    this.photoErr = true;
    console.log("Your browser doesn't have support for the navigator.getUserMedia interface.");
  }

  startVideo(camStream: HTMLVideoElement) {
    this.showVideo = true;
    this.camStream = camStream;
    //this.camStream.style.display = "block";
    if (!navigator.getUserMedia) {
      this.photoErr = true;
      console.log("Your browser doesn't have support for the navigator.getUserMedia interface.");
    }
    else {
      navigator.getUserMedia({ video: true }, this.videoSuccess.bind(this), this.videoFailure.bind(this));
    }
  }

  takeSnapshot(hiddenCanvas: HTMLCanvasElement, snapshot: HTMLImageElement) {
    this.snapshot = snapshot;
    let context = hiddenCanvas.getContext('2d');
    let width = this.camStream.videoWidth;
    let height = this.camStream.videoHeight;
    if (width && height) {
      hiddenCanvas.width = width;
      hiddenCanvas.height = height;
      context.drawImage(this.camStream, 0, 0, width, height);
      let snap = hiddenCanvas.toDataURL('image/png');
      this.photoStr = snap;
      this.showSnapshot = true;
      //this.camStream.style.display = "none";
      //this.snapshot.style.display = "block";
      this.snapshot.setAttribute('src', snap);
      this.showVideo = false;
      this.camStream.src = null;
    }
  }

}