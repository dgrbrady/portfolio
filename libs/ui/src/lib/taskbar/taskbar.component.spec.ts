// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskbarComponent } from './taskbar.component';
import { initEnv, mount } from 'cypress-angular-unit-test';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import '@angular/compiler';
/* import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing'; */
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MockComponent, MockService } from 'ng-mocks';
import { WindowComponent } from '../window/window.component';
import { WindowService } from '../services/window.service';
// import { getTestBed } from '@angular/core/testing';

@Component({
  template: '<div>Test</div>',
  selector: 'dgrbrady-test',
})
export class TestComponent {}

describe('TaskbarComponent', () => {

  beforeEach(async () => {
    // await import('@angular/compiler');
    /* getTestBed().resetTestEnvironment();
    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      { teardown: { destroyAfterEach: false } }
    ); */

    /* await TestBed.configureTestingModule({
      declarations: [TaskbarComponent],
    }).compileComponents(); */
    /* try {
      await platformBrowserDynamic().bootstrapModule(UiModule);
    } catch (err) {
      console.error(err);
    } */
  });

  /* beforeEach(() => {
    fixture = TestBed.createComponent(TaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); */

  it('should create', () => {
    /* initEnv(TaskbarComponent, {
      imports: [CommonModule, BrowserTestingModule],
      declarations: [
        MockComponent(MenuComponent),
        MockComponent(WindowComponent),
      ],
      providers: [MockService(WindowService)],
    }); */
    initEnv(TaskbarComponent);
    const fixture = mount(TaskbarComponent);
    // initEnv(TestComponent);
    // const fixture = mount(TestComponent);
    expect(fixture).to.exist;
    // expect(true).to.be.true;
    // expect(component).toBeTruthy();
  });
});
