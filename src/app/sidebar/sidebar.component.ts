import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  colours = [];
  brands = [];
  prices = [];
  pricesMin = [];
  pricesMax = [];
  discounts = [
    {"displayValue":"Min","key":"Min"},
    {"displayValue":"5%","key":"5"},
    {"displayValue":"10%","key":"10"},
    {"displayValue":"15%","key":"15"},
    {"displayValue":"20%","key":"20"},
    {"displayValue":"25%","key":"25"},
    {"displayValue":"30%","key":"30"},
    {"displayValue":"35%","key":"35"},
    {"displayValue":"40%","key":"40"},
    {"displayValue":"50%","key":"50"},
    {"displayValue":"50+%","key":"Max"}
  ];
  discountMin = [];
  discountMax = [];
  filters: any = {colours:[], brands:[], prices:{'min': 'Min', 'max': 'Max'}, discount: {'min': 'Min', 'max': 'Max'}};
  selectedMinPrice:string = 'Min';
  selectedMaxPrice:string = 'Max';
  selectedMinDiscount:string = 'Min';
  selectedMaxDiscount:string = 'Max';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getProductFilters().subscribe((data: any[])=>{
      data.forEach((item)=>{
        if(item.type == "COLOUR"){
          let colors = item.values;
          this.colours = colors.map((item)=>{
            return {color:item.color, title:item.title, isSelected: false}
          });
        }
        if(item.type == "BRAND"){
          let brandArr = item.values;
          this.brands = brandArr.map((item)=>{
            return {title:item.title, value:item.value, isSelected: false}
          });
        }
        if(item.type == "PRICE"){
          this.prices = item.values;
          this.pricesMin = this.prices.filter(function (item) {
              return (item.key != "Max");
          });
          this.pricesMax = this.prices.filter(function (item) {
            return (item.key != "Min");
          });



          this.discountMin = this.discounts.filter(function (item) {
              return (item.key != "Max");
          });
          this.discountMax = this.discounts.filter(function (item) {
            return (item.key != "Min");
          });
          
        }
      })
    }) 
  }



  onFilterChange(event:any, filterType:string) {
    if(filterType == 'colour'){
      if ( event.target.checked ) {
        this.filters.colours.push(event.target.value);
      }else{
        this.filters.colours = this.filters.colours.filter(item => item !== event.target.value)
      }
    }
    if(filterType == 'brand'){
      if ( event.target.checked ) {
        this.filters.brands.push(event.target.value);
      }else{
        this.filters.brands = this.filters.brands.filter(item => item !== event.target.value)
      }
    }

    if(filterType == 'princeMin'){
      this.filters.prices.min = event.target.value;
      this.selectedMinPrice = event.target.value;

    }
    if(filterType == 'princeMax'){
      this.filters.prices.max = event.target.value;
      this.selectedMaxPrice = event.target.value;
    }

    if(filterType == 'discMin'){
      this.filters.discount.min = event.target.value;
      this.selectedMinDiscount = event.target.value;
    }

    if(filterType == 'discMax'){
      this.filters.discount.max = event.target.value;
      this.selectedMaxDiscount = event.target.value;
    }
    console.log(this.filters)
    this.messageEvent.emit(this.filters)
  }

  resetAllFilters() {
    console.log("Resetting all filters....")

    this.colours = this.colours.map((item)=>{
      return {color:item.color, title:item.title, isSelected: false}
    });

    this.brands = this.brands.map((item)=>{
      return {title:item.title, value:item.value, isSelected: false}
    });

    this.selectedMinPrice = 'Min';
    this.selectedMaxPrice = 'Max';
    this.selectedMinDiscount = 'Min';
    this.selectedMaxDiscount = 'Max';

    this.filters = {colours:[], brands:[], prices:{'min': 'Min', 'max': 'Max'}, discount: {'min': 'Min', 'max': 'Max'}};
    console.log(this.filters)
    this.messageEvent.emit(this.filters)
  }

}
