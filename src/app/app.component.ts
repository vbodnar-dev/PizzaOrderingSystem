import { Component } from '@angular/core';
import * as $ from "jquery";

const PIZZA_LIST = {
  pizzaSize: [
    {id: 1, name: 'Small', cost: 5.0 }, 
    {id: 2, name: 'Medium', cost: 7.0 },
    {id: 3, name: 'Large', cost: 8.0 },
    {id: 4, name: 'Extra Large', cost: 9.0 }
  ],
  toppings: {
    vegToppings: [
      {id: 1, name: 'Tomatoes', cost: 1.0 }, 
      {id: 2, name: 'Onions', cost: 0.5 }, 
      {id: 3, name: 'Bell pepper', cost: 1.0 }, 
      {id: 4, name: 'Mushrooms', cost: 1.2 }, 
      {id: 5, name: 'Pineapple', cost: 0.75 }, 
    ],
    nonVegToppings: [
      {id: 6, name: 'Sausage', cost: 1.0 }, 
      {id: 7, name: 'Pepperoni', cost: 2.0 }, 
      {id: 8, name: 'Barbecue chiken', cost: 3.0 }, 
    ]
  },
  offers: [
    {id: 1, pizzaSizeId: 2, name: 'Offer1', toppingAmount: 2, pizzaAmount: 1, cost: 5, percentDiscount: false },
    {id: 2, pizzaSizeId: 2, name: 'Offer2', toppingAmount: 4, pizzaAmount: 2, cost: 9, percentDiscount: false },
    {id: 3, pizzaSizeId: 3, name: 'Offer3', toppingAmount: 4, pizzaAmount: 1, cost: 0.5, percentDiscount: true },
  ]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PizzaOS';

  pizzaSizeDS = PIZZA_LIST;

  valuechange(event: Event) {
    var amount = 1;
    var sizeId = (event.target as HTMLInputElement).name.charAt(0);
    var totalCost = PIZZA_LIST.pizzaSize.find(e => e.id == Number(sizeId))?.cost ?? 0;
    var checkedToppings = $("input[name^='" + sizeId + "_']:checked");
    if (checkedToppings.length == 0) {
      $(".pizza-size-" + sizeId).text("");
      $(".offer-pizza-size-" + sizeId).text("");
      $(".cost-sum.pizza-size-" + sizeId).removeClass("old-cost");
      return;
    }

    checkedToppings.each(function( index ) {
      var topId = (this as HTMLInputElement).name.at(2);
      var vegTopCost = PIZZA_LIST.toppings.vegToppings.find(e => e.id == Number(topId))?.cost ?? 0;
      var nonVegTopCost = PIZZA_LIST.toppings.nonVegToppings.find(e => e.id == Number(topId))?.cost ?? 0;
      totalCost = totalCost + vegTopCost + nonVegTopCost;
    });

    var offer = PIZZA_LIST.offers.filter(e => e.pizzaSizeId == Number(sizeId) && e.pizzaAmount == amount && e.toppingAmount == checkedToppings.length);
    if (offer.length > 0) {
      $(".cost-sum-offer.pizza-size-" + sizeId).text(offer[0].percentDiscount ? "$" + (totalCost * offer[0].cost) : "$" + offer[0].cost);
      $(".cost-sum.pizza-size-" + sizeId).addClass("old-cost");
      $(".cost-sum.pizza-size-" + sizeId).text("$" + totalCost ?? "");
      $(".offer-pizza-size-" + sizeId).text(offer[0].name);
    } else {
      $(".cost-sum-offer.pizza-size-" + sizeId).text("");
      $(".cost-sum.pizza-size-" + sizeId).removeClass("old-cost");
      $(".cost-sum.pizza-size-" + sizeId).text("$" + totalCost ?? "");
      $(".offer-pizza-size-" + sizeId).text("");
    }
  }
}
