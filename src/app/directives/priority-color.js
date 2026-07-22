import { __decorate } from "tslib";
import { Directive, computed, inject, input, signal, ElementRef, output } from '@angular/core';
let PriorityColor = class PriorityColor {
    el = inject(ElementRef);
    appPriorityColor = input.required();
    app = output();
    test() {
        this.app.emit("coucou");
    }
    isHovered = signal(false);
    colors = {
        high: { light: 'rgba(255, 142, 142, 1)', full: '#e74d3cff' },
        medium: { light: '#fcc47aff', full: '#ed7812ff' },
        low: { light: 'rgba(147, 254, 147, 1)', full: '#007631ff' },
    };
    currentColors = computed(() => this.colors[this.appPriorityColor()] ?? { light: '#eee', full: '#95a5a6' });
    displayedColor = computed(() => this.isHovered() ? this.currentColors().full : this.currentColors().light);
};
PriorityColor = __decorate([
    Directive({
        selector: '[appPriorityColor]',
        host: {
            '(mouseenter)': 'isHovered.set(true)',
            '(mouseleave)': 'isHovered.set(false)',
            '[style.backgroundColor]': 'displayedColor()',
            '[style.transition]': "'background-color 0.2s ease'",
        },
    })
], PriorityColor);
export { PriorityColor };
