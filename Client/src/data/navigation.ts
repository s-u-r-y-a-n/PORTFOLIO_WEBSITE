export type NavItem = readonly [label: string, id: string];

export const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

export default navItems;
