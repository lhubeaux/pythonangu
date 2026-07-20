import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Banner } from './shared/banner/banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Banner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pythonangu');
}
