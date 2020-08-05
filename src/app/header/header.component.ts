import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() totalItems: number;
  @Input() loaderFlag: boolean = false;

  productTitle: string;
  userName: string = "Guest";


  @Output() messageEvent = new EventEmitter<string>();

  constructor(private backendService: BackendService) {
    let userData = localStorage.getItem('user');
    let userObj = JSON.parse(userData);
    if(userObj){
      this.userName = userObj.username;
      console.log("Logged in user : ",this.userName)
    }
   }
  ngOnInit(): void {
    
  }


  onSearchChange(title:string) {
    this.productTitle = title;
    this.messageEvent.emit(this.productTitle)
  }

}
