import { Component, OnInit } from '@angular/core';
import { UtilService } from '../service/util.service';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



export const CHEF_ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/category', title: 'category', icon: 'nc-tile-56', class: '' },
    { path: '/applications', title: 'applications', icon: 'nc-tile-56', class: '' },
    { path: '/sales-representative', title: 'Sales Representative', icon: 'nc-tile-56', class: '' },
    { path: '/online-retailers', title: 'Online-Retailers', icon: 'nc-tile-56', class: '' },
    { path: '/news', title: 'news', icon: 'nc-tile-56', class: '' },
    { path: '/light-design-layout-request', title: 'Light Design Layout', icon: 'nc-tile-56', class: '' },
    { path: '/catalogs', title: 'catalogs', icon: 'nc-tile-56', class: '' },
    { path: '/products', title: 'products', icon: 'nc-tile-56', class: '' },
    { path: '/return-policy', title: 'Return Policy', icon: 'nc-tile-56', class: '' },
    { path: '/customer-support', title: 'customer-support', icon: 'nc-tile-56', class: '' },
    { path: '/terms-and-conditions', title: 'Terms And Conditions', icon: 'nc-tile-56', class: '' },
    { path: '/warranty', title: 'warranty', icon: 'nc-tile-56', class: '' },
    { path: '/about-us', title: 'About Us', icon: 'nc-tile-56', class: '' },
    { path: '/home-cms', title: 'home-cms', icon: 'nc-tile-56', class: '' },
    { path: '/warranties', title: 'warranties', icon: 'nc-tile-56', class: '' },
    { path: '/navbarmenu', title: 'Navbar Menu', icon: 'nc-tile-56', class: '' },
    { path: '/banner-cms', title: 'banner-cms', icon: 'nc-tile-56', class: '' },
    { path: '/cart-users', title: 'cart users', icon: 'nc-tile-56', class: '' },
    { path: '/privacy-policy', title: 'privacy policy', icon: 'nc-tile-56', class: '' },
    { path: '/support', title: 'support', icon: 'nc-tile-56', class: '' },
    { path: '/distributors', title: 'Become a Distributors', icon: 'nc-tile-56', class: '' },
    { path: '/login1', title: 'Login', icon: 'nc-tile-56', class: '' },
    { path: '/oem-section1', title: 'Oem', icon: 'nc-tile-56', class: '' },
    { path: '/contact-us', title: 'Contact Us', icon: 'nc-tile-56', class: '' },
    { path: '/direction-contact', title: 'Direction-Contact', icon: 'nc-tile-56', class: '' },
    { path: '/email-config', title: 'Mail Config', icon: 'nc-tile-56', class: '' },
    { path: '/product-bulk-upload', title: 'Product Bulk Upload', icon: 'nc-tile-56', class: '' },
    { path: '/special-product', title: 'Special Product', icon: 'nc-tile-56', class: '' },
    { path: '/newsletter', title: 'Newsletter', icon: 'nc-tile-56', class: '' },
    { path: '/reordering-subcategory', title: 'Reordering Subcategory', icon: 'nc-tile-56', class: '' },
    { path: '/customers', title: 'customers', icon: 'nc-tile-56', class: '' },
    { path: '/agents', title: 'agents', icon: 'nc-tile-56', class: '' },
    { path: '/alerts', title: 'alerts', icon: 'nc-tile-56', class: '' },
    { path: '/levels', title: 'levels', icon: 'nc-tile-56', class: '' },
    { path: '/reordering-products', title: 'reordering products', icon: 'nc-tile-56', class: '' },
    { path: '/find', title: 'find', icon: 'nc-tile-56', class: '' },

];

export let ROUTES: RouteInfo[] = [];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private utilService: UtilService, private router: Router) {
    }

    ngOnInit() {
        if (this.utilService.isUserLoggedIn()) {
            if (this.utilService.getUserType() == '2') {
                this.menuItems = CHEF_ROUTES.filter(menuItem => menuItem);
                ROUTES = CHEF_ROUTES;
            } else if (this.utilService.getUserType() == '1') {
                this.menuItems = CHEF_ROUTES.filter(menuItem => menuItem);
                ROUTES = CHEF_ROUTES;
            }
        } else {
            this.router.navigateByUrl('/login')
        }

    }
}
