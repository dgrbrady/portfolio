import { Component } from '@angular/core';
import { MenuItem } from '@dgrbrady/ui';

@Component({
  selector: 'dgrbrady-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desktop';
  menuItems: MenuItem[] = [
    {
      text: 'item 1111111111111111111111111111111111111',
      onClick: () => console.log('click')
    },
    {
      text: 'item with children',
      menuItems: [
        { text: 'first', onClick: () => console.log('sadf') },
        {
          text: 'second',
          menuItems: [
            { text: 'a', onClick: () => console.log('a') },
            { text: 'b', onClick: () => console.log('b') }
          ]
        },
        {
          text: 'third',
          menuItems: [
            { text: 'a', onClick: () => console.log('a') },
            { text: 'b', onClick: () => console.log('b') }
          ]
        }
      ]
    },
    { text: 'item 3', onClick: () => console.log('hi') }
  ];
}
