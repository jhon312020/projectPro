import { FormGroup } from "@angular/forms";
export function ConfirmedValidator(control:string, control2:string) {
      
  
    return (formGroup:FormGroup) => {
      const passwordControl = formGroup.controls[control];
      const confirm_passwordControl = formGroup.controls[control2];

      if (confirm_passwordControl.errors && !confirm_passwordControl.errors['match']) {
        return;
      }

      if (passwordControl.value !== confirm_passwordControl.value) {
        confirm_passwordControl.setErrors({match: true});
      } else {
        confirm_passwordControl.setErrors(null);
      }
    }

}