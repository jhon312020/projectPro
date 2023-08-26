import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './Contact-Us/contact/contact.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { InternshipsComponent } from './internships/internships.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AccessDeniedComponent } from './ErrorTemplates/access-denied/access-denied.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

import { AdminContentComponent } from './_Admin/admin-content/admin-content.component';
import { AdminComponent } from './_Admin/admin/admin.component';
import { AdminofflineordersComponent } from './_Admin/adminofflineorders/adminofflineorders.component';
import { AdminordersComponent } from './_Admin/adminorders/adminorders.component';
import { AdminblogsComponent } from './_Admin/Blog/adminblogs/adminblogs.component';
import { BloglistComponent } from './_Admin/Blog/bloglist/bloglist.component';
import { CategorylistComponent } from './_Admin/Category/categorylist/categorylist.component';
import { CreatecategoryComponent } from './_Admin/Category/createcategory/createcategory.component';
import { DroppedRequestComponent } from './_Admin/dropped-request/dropped-request.component';
import { InterestRequestComponent } from './_Admin/interest-request/interest-request.component';
import { CreateprojectComponent } from './_Admin/Project/createproject/createproject.component';
import { ProjectslistComponent } from './_Admin/Project/projectslist/projectslist.component';
import { UserlistComponent } from './_Admin/User/userlist/userlist.component';
import { UsersComponent } from './_Admin/User/users/users.component';
import { ApproveDownloadRequestComponent } from './_Admin/approve-download-request/approve-download-request.component';
import { ContactsComponent } from './_Admin/contacts/contacts.component';
import { ServicesComponent } from './_Admin/services/services.component';
import { ReportsComponent } from './_Admin/reports/reports.component';
import { ReviewListComponent } from './_Admin/reviews/review-list/review-list.component';
import { TicketListComponent } from './_Admin/Tickets/ticket-list/ticket-list.component';


import { ChangepasswordComponent } from './_Dashboard/changepassword/changepassword.component';
import { DashContentComponent } from './_Dashboard/dash-content/dash-content.component';
import { DashboardComponent } from './_Dashboard/dashboard/dashboard.component';
import { EditComponent } from './_Dashboard/edit/edit.component';
import { OrdersComponent } from './_Dashboard/orders/orders.component';
import { TransactionsComponent } from './_Dashboard/transactions/transactions.component';
import { ReviewFormComponent } from './_Dashboard/reviews/review-form/review-form.component';
import { TicketCreateComponent } from './_Dashboard/Tickets/ticket-create/ticket-create.component';

const routes: Routes = [
  {path:"", title: "Home", component:HomePageComponent},
  // {path:"about", title: "About Us", component: AboutComponent},
  {path:"services", title: "Service", component: ServiceComponent},
  // {path: "team", title: "Team", component: TeamComponent},
  {path: "blog", title: "Blog", component: BlogsComponent},
  {path: "blog/:slug", title: "Blog Details", component: BlogDetailsComponent},
  {path: "contact-us", title: "Contact Us", component:ContactComponent},
  {path: "login", title: "Login", component:LoginComponent},
  {path: "forgot-password", title: "forgot-password", component:ForgotPasswordComponent},
  {path: "reset-password/:email/:token", title: "reset-password", component:ResetPasswordComponent},
  {path: "register", title: "Register", component: RegisterComponent},
  {path: "projects", title: "Projects", component: ProjectsComponent},
  {path: "mini-projects", title: "Mini Projects", component: ProjectsComponent},
  {path: "mini-projects/:category", title: "Mini Projects", component: ProjectsComponent},
  {path: "mini-projects/:category/:projectname", title: "Mini Projects", component: ProjectDetailsComponent},
  {path: "internships", title: "Internships", component: InternshipsComponent},
  {path: "internships/:category", title: "Internships", component: InternshipsComponent},
  {path: "trainings", title: "Trainings", component: TrainingsComponent},
  {path: "trainings/:category", title: "Trainings", component: TrainingsComponent},
  {path: "workshops", title: "Workshops", component: WorkshopsComponent},
  {path: "privacy-policy", title: "Privacy Policy", component: PrivacyPolicyComponent},
  {path: "return-policy", title: "Return Policy", component: ReturnPolicyComponent},
  {path: "cancellation-policy", title: "Cancellation Policy", component: CancellationPolicyComponent},
  {path: "terms-of-use", title: "Terms of Use", component: TermsOfUseComponent},
  {path: "terms-and-conditions", title: "Terms and Conditions", component: TermsAndConditionsComponent},
  {path: "workshops/:category", title: "Workshops", component: WorkshopsComponent},
  {path: "projects/:category", title: "Projects", component: ProjectsComponent},
  {path: "projects/:category/:projectname", title: "Projects", component: ProjectDetailsComponent},
  {path: 'payment/:projectname/:id', title: 'Payment', component:PaymentComponent},
  {path: 'access-denied', title: 'Access Denied', component:AccessDeniedComponent},
  {path: "dashboard", title: "Dashboard", component:DashboardComponent, children: [
    {path: "", component:DashContentComponent},
    {path: "edit", title: "Edit Acount", component: EditComponent},
    {path: "changepassword", title: "Change Password", component:ChangepasswordComponent},
    {path: 'orders', title: "Orders", component:OrdersComponent},
    {path: 'transactions', title: "Transactions", component:TransactionsComponent},
    {path: "review/:order_id", title: "Reviews", component: ReviewFormComponent},
    {path: "ticket/:order_id", title: "Support", component: TicketCreateComponent},
  ]},
  {path: "admin", title: "Admin Dashboard", component: AdminComponent, children: [
    {path: "", component: AdminContentComponent},
    {path: "projectslist", title: "Project List", component:ProjectslistComponent},
    {path: "createproject", title: "Create Project", component:CreateprojectComponent},
    {path: "editproject/:id", title: "Edit Project", component: CreateprojectComponent},
    {path: "userslist", title: "Users List", component:UserlistComponent},
    {path: "createuser", title: "Create User", component: UsersComponent},
    {path: "edituser/:id", title: "Edit User", component:UsersComponent},
    {path: "categorylist", title: "Category List", component: CategorylistComponent},
    {path: "createcategory", title: "Create Category", component: CreatecategoryComponent},
    {path: "editcategory/:id", title: "Edit Category", component: CreatecategoryComponent},
    {path: 'orderslist', title: "Orders", component:AdminordersComponent},
    {path: 'offlineorderslist', title: "Offline Orders", component:AdminofflineordersComponent},
    {path: 'interestRequestlist', title: "Interest Requests", component:InterestRequestComponent},
    {path: 'droppedRequestlist', title: "Dropped Requests", component:DroppedRequestComponent},
    {path: 'approveDownloadRequestlist', title: "Download Approval Requests", component: ApproveDownloadRequestComponent},
    {path: 'blogslist', title: "Blogs-admin", component:BloglistComponent},
    {path: 'createblog', title: "Create Blogs-admin", component:AdminblogsComponent},
    {path: 'editblog/:id', title: "Create Blogs-admin", component:AdminblogsComponent},
    {path: 'contacts', title: "Contacts", component:ContactsComponent},
    {path: 'services', title: "Services", component:ServicesComponent},
    {path: 'reports', title: "Reports", component:ReportsComponent},
    {path: 'reviews', title: "Reviews", component:ReviewListComponent},
    {path: 'ticket/list', title: "Tickets", component:TicketListComponent},

  ]},
  {path: "**", title: "NOT FOUND", component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
