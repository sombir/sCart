import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getProductList().subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
    }) 
  }

}
