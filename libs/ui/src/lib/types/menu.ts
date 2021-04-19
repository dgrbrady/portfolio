export interface MenuItem {
  text: string;
  onClick?: () => unknown;
  menuItems?: MenuItem[];
}
