import { AppComponent } from './app.component';
// import { TestBed } from '@angular/core/testing';
import { initEnv, mount } from 'cypress-angular-unit-test';
// import { TaskbarComponent, UiModule } from '@dgrbrady/ui';
// import { Component } from '@angular/core';
import { TestComponent } from './test.component';
import { TaskbarComponent } from '@dgrbrady/ui';


describe('AppComponent', () => {
  /* beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'desktop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('desktop');
  }); */

  it('should mount', () => {
    initEnv(AppComponent);
    const fixture = mount(AppComponent);
    /* initEnv(TestComponent);
    const fixture = mount(TestComponent); */
    expect(fixture).to.exist;
  });
});
