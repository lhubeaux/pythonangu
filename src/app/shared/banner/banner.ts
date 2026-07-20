import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {}
