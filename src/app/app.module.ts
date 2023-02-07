import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTeacherComponent } from './modals/edit-teacher/edit-teacher.component';
import { FormsModule } from "@angular/forms";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AlertsComponent } from './pages/alerts/alerts.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { UiSwitchModule } from "ngx-ui-switch";
import { LoginComponent } from './pages/login/login.component';
import { LocationEditorComponent } from './modals/location-editor/location-editor.component';
import { HomeCMSComponent } from './pages/home-cms/home-cms.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { AddUpdateApplicationsComponent } from './modals/add-update-applications/add-update-applications.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddUpdateCategoryComponent } from './modals/add-update-category/add-update-category.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { AddUpdateSubcategoryComponent } from './modals/add-update-subcategory/add-update-subcategory.component';
import { AddUpdateSubsubcategoryComponent } from './modals/add-update-subsubcategory/add-update-subsubcategory.component';
import { SubsubcategoryComponent } from './pages/subsubcategory/subsubcategory.component';
import { SalesRepresentativeComponent } from './pages/sales-representative/sales-representative.component';
import { OnlineRetailersComponent } from './pages/online-retailers/online-retailers.component';
import { LightDesignLayoutComponent } from './pages/light-design-layout/light-design-layout.component';
import { NewsComponent } from './pages/news/news.component';
import { AddUpdateOnlineRetailersComponent } from './modals/add-update-online-retailers/add-update-online-retailers.component';
import { AddUpdateSalesRepresentativeComponent } from './modals/add-update-sales-representative/add-update-sales-representative.component';
import { AddUpdateNewsComponent } from './modals/add-update-news/add-update-news.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { AddCatalogsComponent } from './modals/add-catalogs/add-catalogs.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductsComponent } from './modals/add-products/add-products.component';
import { AddProdSpecificationComponent } from './modals/add-prod-specification/add-prod-specification.component';
import { AddProdResourcesComponent } from './modals/add-prod-resources/add-prod-resources.component';
import { AddProdDimensionsComponent } from './modals/add-prod-dimensions/add-prod-dimensions.component';
import { ProdallspecsComponent } from './modals/prodallspecs/prodallspecs.component';
import { ProdallresourcesComponent } from './modals/prodallresources/prodallresources.component';
import { ProdalldimensionsComponent } from './modals/prodalldimensions/prodalldimensions.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { CustomersupportComponent } from './pages/customersupport/customersupport.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { WarrantyComponent } from './modals/warranty/warranty.component';
import { AddLoginurlComponent } from './modals/add-loginurl/add-loginurl.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AddAboutUsComponent } from './modals/add-about-us/add-about-us.component';
import { WarrantiesComponent } from './pages/warranties/warranties.component';
import { NavbarMenuComponent } from './pages/navbar-menu/navbar-menu.component';
import { BannersCmsComponent } from './pages/banners-cms/banners-cms.component';
import { CartUserComponent } from './pages/cart-user/cart-user.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SupportComponent } from './pages/support/support.component';
import { DistributorsComponent } from './pages/distributors/distributors.component';
import { ProductModalCartComponent } from './modals/product-modal-cart/product-modal-cart.component';
import { HttpinterceptorService } from "./service/httpinterceptor.service";
import { NgxSpinnerModule } from 'ngx-spinner';
import { Login1Component } from './pages/login1/login1.component';
import { ListingsProductsComponent } from './pages/listings-products/listings-products.component';
import { OemSection1Component } from './pages/oem-section1/oem-section1.component';
import { AddUpdateOemSection1Component } from './modals/add-update-oem-section1/add-update-oem-section1.component';
import { OemSection2Component } from './pages/oem-section2/oem-section2.component';
import { OemLocationsComponent } from './pages/oem-locations/oem-locations.component';
import { AddUpdateOemLocationsComponent } from './modals/add-update-oem-locations/add-update-oem-locations.component';
import { OemContactComponent } from './pages/oem-contact/oem-contact.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AddUpdateContactUsComponent } from './modals/add-update-contact-us/add-update-contact-us.component';
import { DirectionContactComponent } from './pages/direction-contact/direction-contact.component';
import { EmailConfigComponent } from './pages/email-config/email-config.component';
import { BulkUploadComponent } from './pages/bulk-upload/bulk-upload.component';
import { AddUpdateOemContactsComponent } from './modals/add-update-oem-contacts/add-update-oem-contacts.component';
import { SpecialProductComponent } from './pages/special-product/special-product.component';
import { AddSpecialProductComponent } from './modals/add-special-product/add-special-product.component';
import { SpecialProductsComponent } from './modals/special-products/special-products.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { SearchPipe } from './pipe/search.pipe';
import { ReorderingSubcategoryComponent } from './pages/reordering-subcategory/reordering-subcategory.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddUpdateDirectionContactComponent } from './modals/add-update-direction-contact/add-update-direction-contact.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { AddCustomersComponent } from './modals/add-customers/add-customers.component';
import { AddAgentsComponent } from './modals/add-agents/add-agents.component';
import { ApproveUserComponent } from './modals/approve-user/approve-user.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { AddLevelsComponent } from './modals/add-levels/add-levels.component';
import { ProdlevelsComponent } from './modals/prodlevels/prodlevels.component';
import { AddProdLevelsComponent } from './modals/add-prod-levels/add-prod-levels.component';
import { AddAccessoriesComponent } from './modals/add-accessories/add-accessories.component';
import { ProdaccessoriesComponent } from './modals/prodaccessories/prodaccessories.component';
import { AddGlobalResourcesComponent } from './modals/add-global-resources/add-global-resources.component';
import { ProductretailersComponent } from './modals/productretailers/productretailers.component';
import { ReorderingProductsComponent } from './pages/reordering-products/reordering-products.component';
import { NgxMultipleSelectModule } from 'ngx-multiple-select';
import { FindStoreComponent } from './pages/find-store/find-store.component';
import { AddFindComponent } from './modals/add-find/add-find.component';
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        AlertsComponent,
        ConfirmationModalComponent,
        LocationEditorComponent,
        HomeCMSComponent,
        ApplicationsComponent,
        AddUpdateApplicationsComponent,
        CategoryComponent,
        AddUpdateCategoryComponent,
        SubcategoryComponent,
        AddUpdateSubcategoryComponent,
        AddUpdateSubsubcategoryComponent,
        SubsubcategoryComponent,
        SalesRepresentativeComponent,
        OnlineRetailersComponent,
        LightDesignLayoutComponent,
        NewsComponent,
        AddUpdateOnlineRetailersComponent,
        AddUpdateSalesRepresentativeComponent,
        AddUpdateNewsComponent,
        CatalogsComponent,
        AddCatalogsComponent,
        ProductsComponent,
        AddProductsComponent,
        AddProdSpecificationComponent,
        AddProdResourcesComponent,
        AddProdDimensionsComponent,
        ProdallspecsComponent,
        ProdallresourcesComponent,
        ProdalldimensionsComponent,
        ReturnPolicyComponent,
        CustomersupportComponent,
        TermsAndConditionsComponent,
        WarrantyComponent,
        AddLoginurlComponent,
        AboutUsComponent,
        AddAboutUsComponent,
        WarrantiesComponent,
        NavbarMenuComponent,
        BannersCmsComponent,
        CartUserComponent,
        PrivacyPolicyComponent,
        SupportComponent,
        DistributorsComponent,
        ProductModalCartComponent,
        Login1Component,
        ListingsProductsComponent,
        OemSection1Component,
        AddUpdateOemSection1Component,
        OemSection2Component,
        OemLocationsComponent,
        AddUpdateOemLocationsComponent,
        OemContactComponent,
        ContactUsComponent,
        AddUpdateContactUsComponent,
        DirectionContactComponent,
        EmailConfigComponent,
        BulkUploadComponent,
        AddUpdateOemContactsComponent,
        SpecialProductComponent,
        AddSpecialProductComponent,
        SpecialProductsComponent,
        NewsletterComponent,
        SearchPipe,
        ReorderingSubcategoryComponent,
        AddUpdateDirectionContactComponent,
        CustomersComponent,
        AgentsComponent,
        AddCustomersComponent,
        AddAgentsComponent,
        ApproveUserComponent,
        LevelsComponent,
        AddLevelsComponent,
        ProdlevelsComponent,
        AddProdLevelsComponent,
        AddAccessoriesComponent,
        ProdaccessoriesComponent,
        AddGlobalResourcesComponent,
        ProductretailersComponent,
        ReorderingProductsComponent,
        FindStoreComponent,
        AddFindComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        SidebarModule,
        AngularEditorModule,
        NavbarModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FooterModule,
        FixedPluginModule,
        NgbModule,
        FormsModule,
        GooglePlaceModule,
        NgxSpinnerModule,
        UiSwitchModule.forRoot({
            size: 'small',
            color: 'rgb(0, 189, 99)',
            switchColor: '#80FFA2',
            defaultBgColor: '#00ACFF',
            defaultBoColor: '#476EFF',
            checkedLabel: 'on',
            uncheckedLabel: 'off'
        }),
        DragDropModule,
        NgxMultipleSelectModule,
        ScrollingModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
