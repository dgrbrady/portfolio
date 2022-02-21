import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { TaskbarComponent } from '@dgrbrady/ui';
import { initEnv, mount } from 'cypress-angular-unit-test';

describe('AppComponent', () => {
  it('should mount', () => {
    initEnv(AppComponent, { declarations: [MockComponent(TaskbarComponent)] });
    const fixture = mount(AppComponent);
    expect(fixture).to.exist;
  });

  it('should contain TaskbarComponent', () => {
    initEnv(AppComponent, { declarations: [MockComponent(TaskbarComponent)] });
    mount(AppComponent);
    cy.get('dgrbrady-taskbar');
  });
});
