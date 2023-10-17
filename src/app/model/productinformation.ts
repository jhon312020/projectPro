export interface Productinformation {
  name: string
}

export interface user {
  appToken?: string,
  id?: number,
  name: string,
  email: string,
  mobile: string,
  password?: string,
  role: string,
  status?: boolean,
  user_token?: string,
  created_at?: string,
  profile?: string | null,
  updated_at?: string
}

export interface login {
  appToken?: string,
  email: string,
  password: string
}

export interface forgotPassword {
  appToken?: string,
  email: string,
}

export interface resetPassword {
  appToken?: string,
  resetToken?: string,
  email?: string,
  password: string,
}

export type editUser = Omit<user,  'password'>;

export interface changePassword {
  appToken?: string,
  old_password: string,
  new_password: string,
  userToken?: string,
}

export interface category {
  id?: number
  title: string,
  slug: string,
  img: any | null,
  status: boolean,
  count?: number ,
  order_by: number
}
export interface Project {
  id?: number,
  title: string,
  slug: string,
  type: string,
  img: string | any,
  content: string,
  description: string,
  category_id: category | string,
  price: number | string,
  discount: number | string,
  src_code: any,
  src_video?: string,
  status: boolean,
}

export interface Contact {
  id?: number,
  name: string,
  email: string,
  mobile_number: string,
  subject: string,
  message: string,
}

export interface Service {
  id?: number,
  name: string,
  email: string,
  mobile_number: string,
  category_id: string,
  service_name: string,
  message: string,
  college_info: string,
}

export interface ProjectList extends Omit<Project, 'category'> {
  category: category,
  cat_slug: string,
  cat_title: string,
  created_at?: string
}

export interface err_handle {
  status: boolean | null,
  msg: string
}

export interface res {
  status: boolean| null,
  message: string,
  success?: user
}

export interface file_response {
  status: string,
  filename: string,
  message: string
}

export interface fileValidator {
  result: file_response[],
  files: any[]
}

export interface buttonJSON {
  Route: string,
  ButtonName: string
}

export interface reports {
  from_date: string,
  to_date: string,
  appToken?: string,
  userToken?: string,
}

export interface blogs {
  id?: number,
  title: string,
  slug: string,
  img: any,
  content: string,
  launch_date?:string,
  category_id?: category | string,
  cat_title?: string,
  status: boolean,
  created_at?: string
}

export interface paginationModel {
  page: number,
  itemsPerPage: number,
  totalRecCount: number
}
export interface backPage {
  label: string,
  route: string
}

export interface review {
  order_id: string,
  title: string,
  rating: string,
  message: string,
  name: string
}

export interface ticket {
  order_id: string,
  title: string,
  subject: string,
  message: string,
}

export interface Testimonial {
  id?: number,
  name: string,
  rating: string,
  img: any,
  message: string,
  created_at?: string,
  admin_approval: boolean
}

export interface UPI {
  pa: string,
  pn: string,
  tn: string,
  am: string,
  cu: string
}
