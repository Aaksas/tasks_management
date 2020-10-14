import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  toggled2 = false;
  menus = [
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  toggle2() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  getRightSideBarState() {
    return this.toggled2;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }
  setSidebarState2(state: boolean) {
    this.toggled2 = state;
  }

  getMenuList() {
    return this.menus;
  }

  
}