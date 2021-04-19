import { OverlayRef, Overlay, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '../types';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'dgrbrady-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnDestroy {
  @Input() menuItems: MenuItem[];
  @ViewChild('menuTemplate') menuTemplate: TemplateRef<unknown>;
  openItems: MenuItem[] = [];
  activeItem: MenuItem;
  overlayRefs: OverlayRef[] = [];
  clicks = fromEvent<MouseEvent>(this.document, 'click')
    .pipe(
      filter(
        (event) =>
          !this.getAllMenus().some((element) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return element.contains(event.target as any);
          })
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

  getAllMenus(): Element[] {
    return Array.from(this.document.querySelectorAll('.menu'));
  }

  ngOnDestroy(): void {
    this.disposeOfMenus();
  }

  onClick(item: MenuItem, liElement: HTMLLIElement): void {
    if (item.menuItems) {
      this.showChildren(item, liElement);
    } else {
      this.disposeOfMenus();
      this.activeItem = undefined;
      this.openItems = [];
      item.onClick();
    }
  }

  showChildren(item: MenuItem, liElement: HTMLLIElement): void {
    /* Needs work, should only allow one sibling menu open at a time */
    // if (this.openItems.length > 0) {
    //   if (liElement === this.openItems[this.openItems.length - 1]) {
    //     return;
    //   } else {
    //     this.openItems.push(liElement);
    //     const lastOverlayRef = this.overlayRefs.splice(
    //       this.overlayRefs.length
    //     )[0];
    //     lastOverlayRef.dispose();
    //   }
    // } else {
    //   this.openItems.push(liElement);
    // }
    if (this.openItems.some((openItem) => openItem.text === item.text)) {
      return;
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
          overlayY: 'top'
        } as ConnectedPosition
      ]);
    const overlayRef = this.overlay.create({
      panelClass: 'menu',
      positionStrategy
    });
    const menuPortal = new TemplatePortal(this.menuTemplate, this.vcRef, {
      $implicit: item.menuItems
    });
    overlayRef.attach(menuPortal);
    this.overlayRefs.push(overlayRef);
    return;
  }
}
