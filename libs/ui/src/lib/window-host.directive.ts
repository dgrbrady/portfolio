import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dgrbradyWindowHost]',
})
export class WindowHostDirective {
  constructor(public vcRef: ViewContainerRef) {}
}
