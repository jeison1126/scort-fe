export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  label?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
  label?: string;
}