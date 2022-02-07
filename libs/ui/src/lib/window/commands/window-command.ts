import { Command } from '../../types/command';

export abstract class WindowCommand implements Command {
  abstract execute(): void;
}
