import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sCart';
  loaderFlag:boolean = true;
  
  constructor(private router: Router,) {
    let userData = localStorage.getItem('user');
    if(!userData){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/products']);
    }
   }

  showHideLoader($event) {
    this.loaderFlag = $event;
  }

}
