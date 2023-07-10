import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

@ViewChild('name') namekey !: ElementRef;
@ViewChild('surname') surnamekey !: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  //some one who click start btn we need to store his name on welcome page 

  startQuiz(){
    
    localStorage.setItem('name', this.namekey.nativeElement.value);
    localStorage.setItem('surname', this.surnamekey.nativeElement.value);
  }
}
