import { __decorate } from "tslib";
import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { DurationPipe } from "../pipes/duration-pipe";
let Chrono = class Chrono {
    totalSeconds = signal(3595);
    isRunning = signal(false);
    intervalId;
    start() {
        if (this.isRunning())
            return;
        this.isRunning.set(true);
        this.intervalId = setInterval(() => {
            this.totalSeconds.update((v) => v + 1);
        }, 1000);
    }
    stop() {
        this.isRunning.set(false);
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }
    reset() {
        this.stop();
        this.totalSeconds.set(0);
    }
    ngOnDestroy() {
        this.stop();
    }
};
Chrono = __decorate([
    Component({
        selector: 'app-chrono',
        imports: [Button, DurationPipe],
        templateUrl: './chrono.html',
        styleUrl: './chrono.css',
    })
], Chrono);
export { Chrono };
