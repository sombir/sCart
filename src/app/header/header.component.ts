import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() totalItems: number;

  productTitle: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private backendService: BackendService) { }
  ngOnInit(): void {
      //this.totalItems = this.backendService.getItemsInCart()
  }


  onSearchChange(title:string) {
    this.productTitle = title;
    this.messageEvent.emit(this.productTitle)
  }

}
