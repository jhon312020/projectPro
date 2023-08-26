import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { category, err_handle, Service, user, res } from 'src/app/model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from 'src/app/_service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.css']
})
export class ServicesFormComponent implements OnInit {

  ServiceForm: FormGroup = new FormGroup({}); 

  @Input() Data: Service = {
    name: "",
    email: "",
    mobile_number: "",
    category_id: "",
    service_name: "",
    message: "",
    college_info: "",
  }

  @Input() public serviceFormInfo = {title: '', categoryLabel: '', collegeInfo: ''};

  submitted: {status: boolean, showLoader: boolean} = {
    status: false,
    showLoader: false
  }
  catSlug: string = '';
  category_id: string = "";
  serviceName: string = '';

  categories: category[] = [];

  constructor(private fb:FormBuilder, private api: ApiService, private activeRoute:ActivatedRoute, public gData:GlobalService) { }

  async ngOnInit() {
    this.loadData();
    this.categories = await this.api.getActiveCategories().toPromise();
    if (this.categories?.length) {
      this.activeRoute.paramMap.subscribe(params => {
        this.serviceName = this.gData.Breadcrumbs.sub_div2.route;
        // let slug = params.get('category');
        // let cat = this.categories?.find((temp) => temp.slug == slug);
        // this.category_id = cat?.id;
        this.category_id = '';
      });

    }
  }
  
  loadData() {
    this.ServiceForm = this.fb.group({
      name: [this.Data.name, Validators.required],
      email: [this.Data.email,[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile_number: [this.Data.mobile_number, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      category_id: [this.Data.category_id, Validators.required],
      message: [this.Data.message, [Validators.required]],
      college_info: [this.Data.college_info],
    });
  }

  get formData(){
    return this.ServiceForm.controls;
  }

  onSubmit() {
    if (this.ServiceForm.valid) {
      const formDataObj = new FormData();
      formDataObj.append("name", this.formData['name'].value);
      formDataObj.append("email", this.formData['email'].value);
      formDataObj.append("mobile_number", this.formData['mobile_number'].value);
      formDataObj.append("service_name", this.serviceName);
      formDataObj.append("category_id", this.formData['category_id'].value);
      formDataObj.append("message", this.formData['message'].value);
      formDataObj.append("college_info", this.formData['college_info'].value);
      this.sendServiceRequestToAdmin(formDataObj);
    }
  }

  sendServiceRequestToAdmin(formDataObj: any) {
    this.submitted.showLoader = true;
    this.api.sendServiceRequest(formDataObj).subscribe((res: res) => {
      this.submitted.showLoader = false;
      if (res.status) {
        this.ServiceForm.reset();
        this.submitted.status = false;
        this.gData.success = res;
      } else {
        this.gData.failure.status = true;
        this.gData.failure.message = res.message;
      }
    },
      (err: any) => {
        this.submitted.showLoader = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      },
    )
  } 

}