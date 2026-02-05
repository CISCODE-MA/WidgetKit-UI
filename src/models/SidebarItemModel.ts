/** Each item within a section */
export interface SidebarItem {
  label: string;
  path?: string;
  icon?: JSX.Element;
  order?: number; // order of item within its section
  children?: SidebarItem[]; // subitems if needed
}

/** Each section has a name, an optional order, and an array of items */
export interface SidebarSection {
  name: string;
  order?: number; // order in which the section appears
  items: SidebarItem[]; // items belonging to this section
}
