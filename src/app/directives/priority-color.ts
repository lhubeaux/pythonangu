import { Directive, computed, inject, input, signal, ElementRef, output } from '@angular/core';

@Directive({
  selector: '[appPriorityColor]',
  host: {
    '(mouseenter)': 'isHovered.set(true)',
    '(mouseleave)': 'isHovered.set(false)',
    '[style.backgroundColor]': 'displayedColor()',
    '[style.transition]': "'background-color 0.2s ease'",
  },
})
export class PriorityColor {
  private el = inject(ElementRef);

  appPriorityColor = input.required<string>();
  app = output<string>();
  test():void{
    this.app.emit("coucou");
  }
  isHovered = signal(false);

  private colors: Record<string, { light: string; full: string }> = {
    high: { light: 'rgba(255, 142, 142, 1)', full: '#e74d3cff' },
    medium: { light: '#fcc47aff', full: '#ed7812ff' },
    low: { light: 'rgba(147, 254, 147, 1)', full: '#007631ff' },
  };

  private currentColors = computed(
    () => this.colors[this.appPriorityColor()] ?? { light: '#eee', full: '#95a5a6' }
  );

  displayedColor = computed(() =>
    this.isHovered() ? this.currentColors().full : this.currentColors().light
  );
}