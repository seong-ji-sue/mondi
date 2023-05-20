declare namespace App {
  interface IAlert {
    show?: boolean;
    title: string;
    desc?: string;
    onNo?(): void;
    onYes(): void;
  }

  interface IMenu {
    name: string;
    path?: string;
    auth?: boolean;
  }
}