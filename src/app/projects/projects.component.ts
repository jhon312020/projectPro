import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { category, Project, ProjectList } from '../model/productinformation';
import { ApiService } from '../_service/api.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  Projects: ProjectList[] | undefined;
  base: string = environment.backend;
  refindArray: string[] = [];
  type: string = "/projects/";
  projectSlug: string = '';
  currentRoute: string[] = [];
  routeName: string = 'Projects'; 
  routeURL: string = '/projects'; 
  projectType: string = 'projects';
  public miniProjectList = 'These projects are aimed to support the Second-year students to achieve the twin objectives of completing their mini projects in the selected technologies and also upskilling themselves in the new technology during their academy timeframe itself.';
  public projectIntroList = [
    'These projects are aimed to support the final year students to achieve the twin objectives of completing their academic main projects in the selected technologies and also upskilling themselves in the new technology during their academy timeframe itself.',
    'The project artifacts include videos, PPTs, Documents and Project base Code in a .zip file format. This can be downloaded on paying a premium amount.',
    'The downloaded project artifacts will enable the students to learn the concepts, Technologies, typical use case and its implementation besides installing and executing the project in their environment.',
    'Additionally, online support for installation and execution of the projects will be provided by IndiTechSoft on request basis.',
    'The students are free to modify or customize the code with their innovative ideas.',
  ];
  public projectIntro = 'Browse through the final year academic Projects (Main Projects) under various technology domains.';
  public miniProjectIntro = 'Browse through the Mini Projects under various technology domains.';
  public commonIntro = ' Identify the project that interests you. Register yourself then login into your account. Click on the identified project. Buy the project by paying the premium amount through QR Code. Download the project artifacts (.zip file). Read and review the project artifacts. Install and execute the project in your environment. Take the Online support from IndiTechSoft frontend Team if you need any help in the installation and execution of the project.';
  constructor(public gData: GlobalService, private api:ApiService, private activeRoute:ActivatedRoute, private router:Router) {  }

  ngOnInit(): void {
    this.gData.clearBreadcrumbs();
    this.currentRoute = this.router.url.split("/");
    if (this.currentRoute.length > 1) {
      switch (this.currentRoute[1]) {
        case 'mini-projects':
          this.routeName = 'Mini Projects';
          this.routeURL = '/mini-projects';
          this.projectType = 'mini-project';
          this.type = '/mini-projects/';
          this.projectIntro = this.miniProjectIntro + this.commonIntro;
          this.projectIntroList[0] = this.miniProjectList;
        break;
        default:
          this.routeName = 'Projects';
          this.routeURL = '/projects';
          this.type = '/projects/';
          this.projectType = 'project';
          this.projectIntro = this.projectIntro + this.commonIntro;
      }
    }
    this.loadBreadcrumbs();
  }

  ngDoCheck() {
    this.loadparams(this.activeRoute.snapshot.params);
  }
  async loadparams(params:any) {
    if (this.projectSlug != params.category) {
      this.projectSlug = params.category;
      if (params.category) {
        await this.loadProject();
        this.Projects = this.gData.Projects?.filter((temp) => temp.cat_slug == params.category);
        let cat = this.gData.Projects?.find((temp) => temp.slug == params.category);
        if (cat) {
          this.gData.Breadcrumbs.sub_div3.name = cat.category.title;
          this.gData.Breadcrumbs.sub_div3.route = this.gData.Breadcrumbs.sub_div2.route+"/"+cat.category.slug;
        }
        this.refindArray.push(params.category);
      } else {
        await this.loadProject();
      }
    }
  }

  loadBreadcrumbs() {
    this.gData.Breadcrumbs.sub_div2.name = this.routeName;
    this.gData.Breadcrumbs.sub_div2.route = this.routeURL;
    this.gData.Breadcrumbs.sub_div3.name = "";
    this.gData.Breadcrumbs.sub_div3.route = "";
  }

  async loadProject() {
    this.gData.Projects = await this.api.getActiveProjects(this.projectType).toPromise();
    if (this.gData.Projects?.length) {
      this.Projects = this.gData.Projects;
    }
  }

  hasNoSelectedProjects() {
    if (this.Projects !== undefined) {
      return this.Projects.length === 0;
    }   
    return false;
  }
    
  changeCategory(e:any) {
    if (e.checked) {
      this.refindArray.push(e.id);
    } else {
      this.refindArray = this.refindArray.filter(temp => temp != e.id);
    }
    if (this.refindArray.length >= 1) {
      this.onSubmit();
    } else {
      this.Projects = JSON.parse(JSON.stringify(this.gData.Projects));
    }
  }
  onSubmit() {
    this.Projects = this.gData.Projects?.filter( temp => this.refindArray.includes(temp.cat_slug));
  }

}
