import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any = [];
  cartItems: number = 0;
  productTitle:string;
  filters:any;
  loader: boolean = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.loader = true;
    this.backendService.getProductList().subscribe((data: any[])=>{
      this.products = data;
      this.loader = false;
    })
  }


  searchProducts($event) {
    this.loader = true;
    this.productTitle = $event;
    this.backendService.getProductByTitle(this.productTitle).subscribe((data: any[])=>{
      this.products = data;
      this.loader = false;
    })
  }

  filterProducts($event) {
    let self = this;
    self.filters = $event;
    this.loader = true;
    if(self.productTitle){
      self.backendService.getProductByTitle(this.productTitle).subscribe((data: any[])=>{
        self.products = this.filterArrayFunction(self.filters, data)
        this.loader = false;
      })
    }else{
      self.backendService.getProductList().subscribe((data: any[])=>{
        self.products = this.filterArrayFunction(self.filters, data)
        this.loader = false;
      })
    }
    
  }


  filterArrayFunction(filters, products){
    //filter by colour
    if(filters.colours.length){
      products = products.filter(function (item) {
        if(filters.colours.includes(item.colour.title.toLocaleLowerCase())){
          return item;
        }
      });
    }
    //filter by brand
    if(filters.brands.length){
      products = products.filter(function (item) {
        if(filters.brands.includes(item.brand.toLocaleLowerCase())){
          return item;
        }
      });
    }

    //filter by price
    if(filters.prices.min != "Min" || filters.prices.max != "Max"){
      let minValue = filters.prices.min;
      let maxValue = filters.prices.max;
      products = products.filter(function (item) {
        if(minValue != "Min" && maxValue != "Max"){
          return (item.price.final_price >= minValue && item.price.final_price <= maxValue);
        }
        if(minValue == "Min" && maxValue != "Max"){
          return (item.price.final_price <= maxValue);
        }
        if(minValue != "Min" && maxValue == "Max"){
          return (item.price.final_price >= minValue);
        }
      });
    }

    //filter by discount
    if(filters.discount.min != "Min" || filters.discount.max != "Max"){
      let minValue = filters.discount.min;
      let maxValue = filters.discount.max;
      products = products.filter(function (item) {
        if(minValue != "Min" && maxValue != "Max"){
          return (item.discount >= minValue && item.discount <= maxValue);
        }
        if(minValue == "Min" && maxValue != "Max"){
          return (item.discount <= maxValue);
        }
        if(minValue != "Min" && maxValue == "Max"){
          return (item.discount >= minValue);
        }
      });
    }
    return products;
  }

  addToCart(productId:number){
    this.cartItems = this.cartItems + 1;
  }

}
