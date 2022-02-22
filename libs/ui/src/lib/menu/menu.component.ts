import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { MenuItem } from '../types';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'dgrbrady-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnDestroy {
  @Input() menuItems: MenuItem[];
  @ViewChild('menuTemplate') menuTemplate: TemplateRef<unknown>;
  @ViewChild('menu') menu: ElementRef<HTMLElement>;
  activeItem: MenuItem;
  overlayRefs: OverlayRef[] = [];
  clicks = fromEvent<MouseEvent>(this.document, 'click')
    .pipe(
      filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event) => !this.menu.nativeElement.contains(event.target as any)
      )
    )
    .subscribe(() => this.disposeOfMenus());

  constructor(
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  disposeOfMenus(): void {
    this.overlayRefs.forEach((overlay) => overlay.dispose());
    this.overlayRefs = [];
  }

  ngOnDestroy(): void {
    this.disposeOfMenus();
    this.clicks.unsubscribe();
  }

  onClick(item: MenuItem, liElement: HTMLLIElement): void {
    if (item.menuItems) {
      this.showChildren(item, liElement);
    } else {
      this.disposeOfMenus();
      this.activeItem = undefined;
      item.onClick();
    }
  }

  showChildren(item: MenuItem, liElement: HTMLLIElement): void {
    if (this.activeItem) {
      this.disposeOfMenus();
    }

    this.activeItem = item;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(liElement)
      .withPositions([
        {
          // top-left of the overlay is connected to top-right of the origin
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
        } as ConnectedPosition,
      ]);
    const overlayRef = this.overlay.create({
      panelClass: 'menu',
      positionStrategy,
    });
    const menuPortal = new TemplatePortal(this.menuTemplate, this.vcRef, {
      $implicit: item.menuItems,
    });
    overlayRef.attach(menuPortal);
    this.overlayRefs.push(overlayRef);
    return;
  }
}
