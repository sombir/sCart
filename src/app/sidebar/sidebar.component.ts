import { Component, OnInit } from '@angular/core';
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
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getProductFilters().subscribe((data: any[])=>{
      data.forEach((item)=>{
        if(item.type == "COLOUR"){
          this.colours = item.values;
        }
        if(item.type == "BRAND"){
          this.brands = item.values;
        }
        if(item.type == "PRICE"){
          this.prices = item.values;
        }
      })
    }) 
  }

}
