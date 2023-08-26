import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ApiService } from "./_service/api.service";
export  class cusValidation {
  static emailNotAllowed(api: ApiService): AsyncValidatorFn {
    return (control: AbstractControl):Observable<ValidationErrors> | Promise<any> => {
      return api
      .emailExistCheck(control.value)
      .pipe(
        map((res: any) => {
          const result = new Promise((resolve, reject) => {
            if(res.status) {
              resolve({emailExists: true});
            } else {
              resolve(null);
            }
          })
          return result;
          // return res.status ? {emailExists: true} : null;
        })
      )
    }
  }
}

// export function emailNotAllowed(control:AbstractControl, api: ApiService) {
//   const response = new Promise((resolve, reject) => {
//     return api.emailExistCheck(control.value).subscribe((res: any) => {
//       if (res.status) {
//         resolve({emailExists: true});
//       } else {
//         resolve(null);
//       }
//     })
//   });
// }