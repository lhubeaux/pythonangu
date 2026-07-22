import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
let SideBar = class SideBar {
    sidebarVisible = false;
    closeSidebar() {
        this.sidebarVisible = false;
    }
};
SideBar = __decorate([
    Component({
        selector: 'app-side-bar',
        imports: [Drawer, Button, RouterOutlet, RouterLink, RouterLinkActive],
        templateUrl: './side-bar.html',
        styleUrl: './side-bar.css',
    })
], SideBar);
export { SideBar };
