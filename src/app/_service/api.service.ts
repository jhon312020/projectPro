import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { category, changePassword, editUser, login, res, user, forgotPassword, resetPassword } from '../model/productinformation';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.backend+"api/";
  appToken: string = environment.apptoken;
  Tokens: string ="?appToken="+this.appToken+"&userToken=";
  data = {
    userToken: "",
    appToken: this.appToken
  }
  user: user | undefined;

  constructor(private http:HttpClient, private gData: GlobalService) { }

  emailExistCheck(email: string):any {
    return this.http.get(this.url + 'checkEmail' +this.Tokens+'&email='+email);
  }

  register(data:user): any {
    data.appToken = this.appToken;
    return this.http.post(this.url + 'adduser', data);
  }

  login(data: login): any {
    data.appToken = this.appToken;
    return this.http.post(this.url + 'login', data);
  }

  forgot(data: forgotPassword): any {
    data.appToken = this.appToken;
    return this.http.post(this.url + 'forgot', data);
  }

  reset(data: resetPassword): any {
    data.appToken = this.appToken;
    return this.http.post(this.url + 'reset', data);
  }
  
  getUserByToken(token: string):any {
    return this.http.get(this.url+"getUserByToken"+this.Tokens+token);
  }
  appendTokensForPost(data: any, token: any) {
   if (data instanceof FormData) {
      data.append('appToken', this.appToken);
      data.append('userToken', token);
    } else {
      data.appToken = this.appToken;
      data.userToken = token;
    }
    return data;
  }
  async getUser() {
    let token = localStorage.getItem("token");
    if (token) {
      let user = this.user = await this.getUserByToken(JSON.parse(token)).toPromise();
      // if(user[1] == 501) {
      //   localStorage.removeItem('token');
      //   window.location.reload();
      // }
      return user;
    }
  }

  edituserDetails(id:number, data: user):any {
    data.appToken = this.appToken;
    return this.http.put(this.url + 'updateuser/' + id, data);
  }

  changePassword(id:number | undefined, data: changePassword):any {
    data.appToken = this.appToken;
    return this.http.put(this.url + 'changePassword/' +id, data);
  }

  // uploadinf a file 
  uploadFile(file:any):any {
    return this.http.post(this.url+"upload", file);
  }
  async getImgPath(files: any[]): Promise<{ status: boolean; path: string[]; filename: string[]; }> {
    const formData = new FormData();
    for(let i = 0; i < files.length; i++) {
      formData.append("file", files[i], "category."+files[i].name.split('.').pop());
    }
    return await this.uploadFile(formData).toPromise();
  }
  
  // Category Api
  CreateCategory(data: any):any {
    data.append('appToken', this.appToken);
    return this.http.post(this.url+"addCategory", data);
  }
  listCategory(token: string):any {
    return this.http.get(this.url+"listCategory"+this.Tokens+token);
  }
  getCategory(id:number, userToken:string):any {
    return this.http.get(this.url+"getCategory/"+id+this.Tokens+userToken);
  }
  getActiveCategories():any {
    return this.http.get(this.url+"getActiveCategories"+this.Tokens);
  }
  UpdateCategory(data:any):any {
    data.append("appToken", this.appToken);
    return this.http.post(this.url+"updateCategory", data);
  }
  deleteCategory(data:{id: number, appToken?:string}):any {
    data.appToken = this.appToken;
    return this.http.put(this.url+"deletecategory", data);
  }
  
  // User api
  createUser(data:any) {
    let token = localStorage.getItem("token");
    if(token) {
      data.userToken = JSON.parse(token);
    }
    // data.userToken = "something";
    data.appToken = this.appToken;
    return this.http.post(this.url + 'createUser', data);
  }
  getUsers(token: string):any {
    return this.http.get(this.url+"users"+this.Tokens+token);
  }
  getuserbyId(id:number):any {
    return this.http.get(this.url+"user/"+id+this.Tokens);
  }
  deleteuser(id:number):any {
    let data = {
      id: id,
      appToken: this.appToken
    }
    return this.http.put(this.url+"deleteuser",data);
  }
  
  // Project api
  listProject(token: string):any {
    return this.http.get(this.url+"listProject"+this.Tokens+token);
  }
  getActiveProjects(type?:string):any {
    return this.http.get(this.url+"getActiveProjects/"+type+this.Tokens);
  }
  getLatestProjects(type?:string):any {
    return this.http.get(this.url+"getLatestProjects/"+type+this.Tokens);
  }
  createProject(data: any):any {
    data.append("appToken", this.appToken);
    return this.http.post(this.url+"addProject", data);
  }
  getprojectById(id:number, token: string):any {
    return this.http.get(this.url+"getProject/"+id+this.Tokens+token);
  }
  deleteProject(data: {id: number, appToken?:string}):any {
    data.appToken = this.appToken;
    return this.http.put(this.url+"deleteProject",data);
  }
  getProjectBySlug(slug: string):any {
    return this.http.get(this.url+"getProjectBySlug/"+slug+this.Tokens);
  }
  UpdateProject(data:any):any {
    data.append("appToken", this.appToken);
    return this.http.post(this.url+"updateProject", data);
  }

  // Interest Request
  sendInterestRequest(data: any) {
    data.appToken = this.appToken;
    return this.http.post(this.url+"sendInterestRequest", data);
  }
  // getInterestRequestsByAdmin(token:string) {
  //   return this.http.get(this.url+"getInterestRequests"+this.Tokens+token);
  // }
  getInterestRequestsByAdmin(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getInterestRequests/"+pageNumber+"/"+itemsPerPage, data);
  }
  // getDroppedRequestsByAdmin(token:string) {
  //   return this.http.get(this.url+"getDroppedRequests"+this.Tokens+token);
  // }
  getDroppedRequestsByAdmin(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getDroppedRequests/"+pageNumber+"/"+itemsPerPage, data);
  }
  // getApproveRequestsByAdmin(token:string) {
  //   return this.http.get(this.url+"getApproveRequests"+this.Tokens+token);
  // }
  getApproveRequestsByAdmin(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getApproveRequests/"+pageNumber+"/"+itemsPerPage, data);
  }
  sendPaymentRequest(data: any) {
    data.appToken = this.appToken;
    return this.http.post(this.url+"sendPaymentRequest", data);
  }
  updateInterestRequest(data:any) {
    data.appToken = this.appToken;
    return this.http.put(this.url+"updateInterestRequest", data);
  }
  giveDownloadPermission(data:any) {
    data.appToken = this.appToken;
    return this.http.put(this.url+"giveDownloadPermission", data);
  }

  // Orders
  checkPurchased(token: string, id:string) {
    id = "&projectId="+id;
    return this.http.get(this.url+"checkPurchased"+this.Tokens+token+id);
  }
  createOrder(data:{user_id: number, slug: string, appToken?:string}):any {
    data.appToken = this.appToken;
    return this.http.post(this.url+"createOrder", data);
  }
  updateOrder(data: {id: string, appToken?:string}):any {
    data.appToken = this.appToken;
    return this.http.put(this.url+"payment", data);
  }
  getOrderDetails(id:number) {
    return this.http.get(this.url+"getOrderDetails/"+id+this.Tokens);
  }
  getordersForsingleUser(id: number, token: string):any {
    return this.http.get(this.url+"getOrderDetailsForsingleUser/"+id+this.Tokens+token);
  }
  // getOrdersByAdmin(data:any, token:string, pageNumber: number, itemsPerPage: number) {
  //   //return this.http.get(this.url+"getOrders"+this.Tokens+token);
  //   //return this.http.get(this.url+"getOrders/"+pageNumber+"/"+itemsPerPage+"/"+this.Tokens+token);
  //   return this.http.post(this.url+"getOrders/"+pageNumber+"/"+itemsPerPage+"/"+this.Tokens+token, data);
  // }
  getOrdersByAdmin(data: any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getOrders/"+pageNumber+"/"+itemsPerPage, data);
  }
  // getofflineOrdersByAdmin(token:string) {
  //   return this.http.get(this.url+"getofflineOrders"+this.Tokens+token);
  // }
  getofflineOrdersByAdmin(data: any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getofflineOrders/"+pageNumber+"/"+itemsPerPage, data);
  }
  getTransactions(token: string) {
    return this.http.get(this.url+"getTransactions"+this.Tokens+token);
  }

  projectDownloadRequest(token: string, order_id: number) {
    return this.http.get(this.url+"projectDownloadRequest/"+order_id+"/"+this.Tokens+token);
  }

  // Blogs api
  getBlogs(token: string):any {
    return this.http.get(this.url+'getBlogs'+this.Tokens+token);
  }
  getActiveBlogs() {
    return this.http.get(this.url+"getActiveBlogs"+this.Tokens);
  }
  getRecentActiveBlogs() {
    return this.http.get(this.url+"getRecentActiveBlogs"+this.Tokens);
  }
  createBlogs(data: any, token: string) {
    data.append('appToken', this.appToken);
    data.append('userToken', token)
    return this.http.post(this.url+'createBlog', data);
  }
  getBlogById(id:number, token:string) {
    return this.http.get(this.url+'getblogbyId/'+id+this.Tokens+token);
  }
  getBlogBySlug(slug:string) {
    let token = this.gData.getToken();
    return this.http.get(this.url+'getBlogBySlug/'+slug+this.Tokens+token);
  }
  updateBlog(data:any, token:string) {
    data.append('appToken', this.appToken);
    data.append('userToken', token)
    return this.http.post(this.url+'updateBlog', data);
  }
  deleteBlog(id:number, token:string) {
    this.data.userToken = token;
    return this.http.put(this.url+'deleteBlog/'+id, this.data);
  }

  // src file download
  getSourceFile(id:number, token: string, orderId: number) {
    this.data.userToken = token;
    return this.http.put(this.url+"getSrcFile/"+id+"?orderId="+orderId, this.data,{responseType: 'blob'});
  }
  
  // get Count 
  AdminCounts: any;
  getadminCounts(token: string) {
    return this.http.get(this.url+'getAdminCount'+this.Tokens+token);
  }
  getReportDashboardCount(data: any, token:string) {
    data.append('appToken', this.appToken);
    data.append('userToken', token)
    return this.http.post(this.url+'getReportDashboardCount',data);
  }
  DashBoardCounts: any;
  getdashboardCounts(token:string) {
    return this.http.get(this.url+'getDashboardCounts'+this.Tokens+token);
  }

  
  // Contact Api
  sendMessage(data: any):any {
    data.append('appToken', this.appToken);
    return this.http.post(this.url+"sendMessage", data);
  }
  // getContactList(token: string, pageNumber: number, itemsPerPage: number) {
  //   return this.http.get(this.url+"getContactList/"+pageNumber+"/"+itemsPerPage+"/"+this.Tokens+token);
  // }
  getContactList(data:any, token:string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getContactList/"+pageNumber+"/"+itemsPerPage, data);
  }

  // Service Api
  sendServiceRequest(data: any):any {
    data.append('appToken', this.appToken);
    return this.http.post(this.url+"sendServiceRequest", data);
  }
  // getServiceList(token: string, pageNumber: number, itemsPerPage: number) {
  //   return this.http.get(this.url+"getServiceList/"+pageNumber+"/"+itemsPerPage+"/"+this.Tokens+token);
  // }
  getServiceList(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getServiceList/"+pageNumber+"/"+itemsPerPage, data);
  }

  // Review Api
  postProjectReview(data: any, token: string):any {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"postProjectReview", data);
  }

  getProjectReview(data: any):any {
    //data = this.appendTokensForPost(order_id, token);
    data.appToken = this.appToken;
    return this.http.post(this.url+"getProjectReview", data);
  }

  getProjectReviewList(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getProjectReviewList/"+pageNumber+"/"+itemsPerPage, data);
  }

  giveApprove(data:any) {
    data.appToken = this.appToken;
    return this.http.put(this.url+"updateApprovalStatus", data);
  }

  giveDisApprove(data:any) {
    data.appToken = this.appToken;
    return this.http.put(this.url+"updateApprovalStatus", data);
  }

  // Ticket Api
  createProjectTicket(data: any, token: string):any {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"ticket/create", data);
  }

  getProjectTicketList(data:any, token: string, pageNumber: number, itemsPerPage: number) {
    data = this.appendTokensForPost(data, token);
    return this.http.post(this.url+"getTicketList/"+pageNumber+"/"+itemsPerPage, data);
  }

  closeTicket(data:any) {
    data.appToken = this.appToken;
    return this.http.put(this.url+"updateCompletedStatus", data);
  }

  
}
