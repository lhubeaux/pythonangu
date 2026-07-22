import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-side-bar',
  imports: [Drawer, Button, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  sidebarVisible: boolean = false;

  closeSidebar(): void {
    this.sidebarVisible = false;
  }
}