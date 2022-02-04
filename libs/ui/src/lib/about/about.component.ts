import { Component } from '@angular/core';

@Component({
  selector: 'dgrbrady-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  githubLink = 'https://github.com/dgrbrady';
  links = [
    {
      href: `${this.githubLink}/portfolio`,
      text: 'Source code for this site',
    },
    { href: '/assets/David_Brady_Resume.pdf', text: 'Download my resume' },
    { href: `${this.githubLink}/fake-news`, text: 'Source code for GTFO' },
    { href: `${this.githubLink}/portfolio`, text: 'Source code for PM-UI' },
    { href: `${this.githubLink}/nvim-lua`, text: 'My NVIM Lua config' },
    { href: 'mailto: dgrbrady@gmail.com', text: 'Email - dgrbrady@gmail.com' },
  ];
}
