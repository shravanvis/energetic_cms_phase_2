import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AlertsComponent } from 'app/pages/alerts/alerts.component';
import { HomeCMSComponent } from "../../pages/home-cms/home-cms.component";
import { ApplicationsComponent } from "../../pages/applications/applications.component"
import { CategoryComponent } from 'app/pages/category/category.component';
import { SubcategoryComponent } from 'app/pages/subcategory/subcategory.component';
import { SubsubcategoryComponent } from 'app/pages/subsubcategory/subsubcategory.component';
import { SalesRepresentativeComponent } from 'app/pages/sales-representative/sales-representative.component';
import { OnlineRetailersComponent } from 'app/pages/online-retailers/online-retailers.component';
import { NewsComponent } from 'app/pages/news/news.component';
import { LightDesignLayoutComponent } from 'app/pages/light-design-layout/light-design-layout.component';
import { CatalogsComponent } from 'app/pages/catalogs/catalogs.component';
import { ProductsComponent } from 'app/pages/products/products.component';
import { ReturnPolicyComponent } from 'app/pages/return-policy/return-policy.component';
import { CustomersupportComponent } from 'app/pages/customersupport/customersupport.component';
import { TermsAndConditionsComponent } from 'app/pages/terms-and-conditions/terms-and-conditions.component';
import { WarrantyComponent } from 'app/modals/warranty/warranty.component';
import { AboutUsComponent } from 'app/pages/about-us/about-us.component';
import { WarrantiesComponent } from 'app/pages/warranties/warranties.component';
import { NavbarMenuComponent } from 'app/pages/navbar-menu/navbar-menu.component';
import { BannersCmsComponent } from 'app/pages/banners-cms/banners-cms.component';
import { CartUserComponent } from 'app/pages/cart-user/cart-user.component';
import { PrivacyPolicyComponent } from 'app/pages/privacy-policy/privacy-policy.component';
import { SupportComponent } from 'app/pages/support/support.component';
import { DistributorsComponent } from 'app/pages/distributors/distributors.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { Login1Component } from 'app/pages/login1/login1.component';
import { OemSection1Component } from 'app/pages/oem-section1/oem-section1.component';
import { OemSection2Component } from 'app/pages/oem-section2/oem-section2.component';
import { OemLocationsComponent } from 'app/pages/oem-locations/oem-locations.component';
import { OemContactComponent } from 'app/pages/oem-contact/oem-contact.component';
import { ContactUsComponent } from 'app/pages/contact-us/contact-us.component';
import { DirectionContactComponent } from 'app/pages/direction-contact/direction-contact.component'
import { EmailConfigComponent } from 'app/pages/email-config/email-config.component'
import { BulkUploadComponent } from 'app/pages/bulk-upload/bulk-upload.component'
import { SpecialProductComponent } from 'app/pages/special-product/special-product.component'
import { NewsletterComponent } from 'app/pages/newsletter/newsletter.component';
import { ReorderingSubcategoryComponent } from 'app/pages/reordering-subcategory/reordering-subcategory.component';
import { CustomersComponent } from 'app/pages/customers/customers.component';
import { AgentsComponent } from 'app/pages/agents/agents.component';
import { LevelsComponent } from 'app/pages/levels/levels.component';
import { ReorderingProductsComponent } from 'app/pages/reordering-products/reordering-products.component';
import { FindStoreComponent } from 'app/pages/find-store/find-store.component';



let chefRoutes = [
    { path: 'dashboard', component: DashboardComponent }

]

let adminRoutes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'alerts', component: AlertsComponent },

]

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'sub-category/:id', component: SubcategoryComponent },
    { path: 'sub-sub-category/:id', component: SubsubcategoryComponent },
    { path: 'sales-representative', component: SalesRepresentativeComponent },
    { path: 'online-retailers', component: OnlineRetailersComponent },
    { path: 'news', component: NewsComponent },
    { path: 'light-design-layout-request', component: LightDesignLayoutComponent },
    { path: 'catalogs', component: CatalogsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'return-policy', component: ReturnPolicyComponent },
    { path: 'customer-support', component: CustomersupportComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'warranty', component: WarrantyComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'home-cms', component: HomeCMSComponent },
    { path: 'warranties', component: WarrantiesComponent },
    { path: 'navbarmenu', component: NavbarMenuComponent },
    { path: 'banner-cms', component: BannersCmsComponent },
    { path: 'cart-users', component: CartUserComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'support', component: SupportComponent },
    { path: 'distributors', component: DistributorsComponent },
    { path: 'login1', component: Login1Component },
    { path: 'oem-section1', component: OemSection1Component },
    { path: 'oem-section2', component: OemSection2Component },
    { path: 'oem-locations', component: OemLocationsComponent },
    { path: 'oem-contact', component: OemContactComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'direction-contact', component: DirectionContactComponent },
    { path: 'email-config', component: EmailConfigComponent },
    { path: 'product-bulk-upload', component: BulkUploadComponent },
    { path: 'special-product', component: SpecialProductComponent },
    { path: 'newsletter', component: NewsletterComponent },
    { path: 'reordering-subcategory', component: ReorderingSubcategoryComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'agents', component: AgentsComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'levels', component: LevelsComponent },
    { path: 'reordering-products', component: ReorderingProductsComponent },
    { path: 'find', component: FindStoreComponent },

];

// export const AdminLayoutRoutes: Routes = getRoutes();
//
// function getRoutes(){
//     if(localStorage.getItem('USER_PROFILE')!=null&&localStorage.getItem('USER_PROFILE')!=undefined){
//         let profile=JSON.parse(localStorage.getItem('USER_PROFILE'));
//         if(profile.hasOwnProperty('type')){
//             console.log("admin routes");
//             return adminRoutes;
//         }else{
//             console.log("chef routes");
//             return chefRoutes;
//         }
//     }else{
//         console.log("empty routes");
//         return [];
//     }
// }
