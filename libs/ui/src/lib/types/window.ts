import { Type } from '@angular/core';

export interface WindowSize {
  height: number;
  width: number;
}

export interface WindowConfig<T = unknown> {
  /** Component to display in the window */
  component: Type<T>;
  /** Inputs for the component */
  inputs?: Partial<T>;
  /** Whether or not you can spawn multiple instances of the same window */
  multiple?: boolean;
  /** Title of the window shown in the header */
  title?: string;
}
