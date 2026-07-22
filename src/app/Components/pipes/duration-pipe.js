import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let DurationPipe = class DurationPipe {
    transform(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 0) {
            return `${hours}:${this.pad(minutes)}:${this.pad(seconds)}`;
        }
        if (minutes > 0) {
            return `${minutes}:${this.pad(seconds)}`;
        }
        return `${seconds}`;
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
};
DurationPipe = __decorate([
    Pipe({
        name: 'duration',
    })
], DurationPipe);
export { DurationPipe };
