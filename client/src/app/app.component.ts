import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbModule, HttpClientModule]
})
export class AppComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
