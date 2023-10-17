import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';

import { SafeUrlPipe } from './_CustomPipe/safeUrl.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaFormsModule,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module
} from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './_includes/header/header.component';
import { FooterComponent } from './_includes/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './Contact-Us/contact/contact.component';
import { AlertMsgComponent } from './_Alert/alert-msg/alert-msg.component';
import { AlertMsgDangerComponent } from './_Alert/alert-msg-danger/alert-msg-danger.component';
import { AlertMsgSuccessComponent } from './_Alert/alert-msg-success/alert-msg-success.component';

import { DashboardComponent } from './_Dashboard/dashboard/dashboard.component';
import { DashContentComponent } from './_Dashboard/dash-content/dash-content.component';
import { SidebarComponent } from './_Dashboard/sidebar/sidebar.component';
import { EditComponent } from './_Dashboard/edit/edit.component';
import { ChangepasswordComponent } from './_Dashboard/changepassword/changepassword.component';
import { ReviewFormComponent } from './_Dashboard/reviews/review-form/review-form.component';
import { OrdersComponent } from './_Dashboard/orders/orders.component';
import { TransactionsComponent } from './_Dashboard/transactions/transactions.component';
import { TicketCreateComponent } from './_Dashboard/Tickets/ticket-create/ticket-create.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecentBlogsComponent } from './recent-blogs/recent-blogs.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PaymentComponent } from './payment/payment.component';

import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { IntrestedFormComponent } from './intrested-form/intrested-form.component';
import { InternshipsComponent } from './internships/internships.component';
import { ServicesFormComponent } from './services-form/services-form.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AccessDeniedComponent } from './ErrorTemplates/access-denied/access-denied.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

import { AdminComponent } from './_Admin/admin/admin.component';
import { ProjectslistComponent } from './_Admin/Project/projectslist/projectslist.component';
import { ListingComponent } from './_Admin/listing/listing.component';
import { ListTableComponent } from './_Admin/list-table/list-table.component';
import { UserlistComponent } from './_Admin/User/userlist/userlist.component';
import { CategoryFormComponent } from './_Admin/Category/category-form/category-form.component';
import { CategorylistComponent } from './_Admin/Category/categorylist/categorylist.component';
import { CreatecategoryComponent } from './_Admin/Category/createcategory/createcategory.component';
import { ListComponent } from './_Admin/list/list.component';
import { UserFormComponent } from './_Admin/User/user-form/user-form.component';
import { UsersComponent } from './_Admin/User/users/users.component'; 
import { CreateprojectComponent } from './_Admin/Project/createproject/createproject.component';
import { ProjectFormComponent } from './_Admin/Project/project-form/project-form.component';
import { AdminContentComponent } from './_Admin/admin-content/admin-content.component';
import { AdminordersComponent } from './_Admin/adminorders/adminorders.component';
import { BloglistComponent } from './_Admin/Blog/bloglist/bloglist.component';
import { BlogformComponent } from './_Admin/Blog/blogform/blogform.component';
import { AdminblogsComponent } from './_Admin/Blog/adminblogs/adminblogs.component';
import { InterestRequestComponent } from './_Admin/interest-request/interest-request.component';
import { ApproveDownloadRequestComponent } from './_Admin/approve-download-request/approve-download-request.component';
import { AdminofflineordersComponent } from './_Admin/adminofflineorders/adminofflineorders.component';
import { DroppedRequestComponent } from './_Admin/dropped-request/dropped-request.component';
import { ContactsComponent } from './_Admin/contacts/contacts.component';
import { ServicesComponent } from './_Admin/services/services.component';
import { ReportsComponent } from './_Admin/reports/reports.component';
import { BacktopageComponent } from './_Admin/_includes/backtopage/backtopage.component';
import { FromToDateFormComponent } from './_Admin/_includes/from-to-date-form/from-to-date-form.component';
import { ReviewListComponent } from './_Admin/reviews/review-list/review-list.component';
import { TicketListComponent } from './_Admin/Tickets/ticket-list/ticket-list.component';

import { environment } from 'src/environments/environment';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialListComponent } from './_Admin/Testimonial/testimonial-list/testimonial-list.component';
import { TestimonialFormComponent } from './_Admin/Testimonial/testimonial-form/testimonial-form.component';
import { TestimonialCreateComponent } from './_Admin/Testimonial/testimonial-create/testimonial-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AboutComponent,
    ServiceComponent,
    TeamComponent,
    BlogsComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DashboardComponent,
    DashContentComponent,
    SidebarComponent,
    AlertMsgComponent,
    AlertMsgDangerComponent,
    AlertMsgSuccessComponent,
    EditComponent,
    ChangepasswordComponent,
    AdminComponent,
    ProjectslistComponent,
    CreateprojectComponent,
    ListingComponent,
    ListTableComponent,
    UserlistComponent,
    CategoryFormComponent,
    CategorylistComponent,
    CreatecategoryComponent,
    SafeUrlPipe,
    ListComponent,
    UserFormComponent,
    UsersComponent,
    ProjectFormComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    PaymentComponent,
    OrdersComponent,
    AdminContentComponent,
    TransactionsComponent,
    AdminordersComponent,
    BloglistComponent,
    BlogformComponent,
    AdminblogsComponent,
    BlogDetailsComponent,
    IntrestedFormComponent,
    InterestRequestComponent,
    ApproveDownloadRequestComponent,
    AdminofflineordersComponent,
    DroppedRequestComponent,
    ContactsComponent,
    InternshipsComponent,
    ServicesFormComponent,
    WorkshopsComponent,
    TrainingsComponent,
    ServicesComponent,
    ReportsComponent,
    BacktopageComponent,
    FromToDateFormComponent,
    RecentBlogsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccessDeniedComponent,
    ReviewFormComponent,
    ReviewListComponent,
    TicketCreateComponent,
    TicketListComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent,
    CancellationPolicyComponent,
    TermsOfUseComponent,
    TermsAndConditionsComponent,
    TestimonialsComponent,
    TestimonialListComponent,
    TestimonialFormComponent,
    TestimonialCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    QRCodeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.site_key
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.site_key
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
