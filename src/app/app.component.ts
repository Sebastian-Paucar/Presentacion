import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Presentacion';

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      import('flowbite').then(flowbite => {
        flowbite.initFlowbite();
      }).catch(error => console.error('Error loading Flowbite', error));
    }
  }

}
