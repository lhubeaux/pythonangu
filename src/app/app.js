import { __decorate } from "tslib";
import { Component, signal } from '@angular/core';
import { SideBar } from "./Components/side-bar/side-bar";
let App = class App {
    title = signal('ExoAng');
};
App = __decorate([
    Component({
        selector: 'app-root',
        imports: [SideBar],
        templateUrl: './app.html',
        styleUrl: './app.css'
    })
], App);
export { App };
