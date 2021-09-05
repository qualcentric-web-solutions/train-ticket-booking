import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  static getValidatorErrorMessage(validatorName:String, validatorValue?:any){
    let config={
      'InvalidPhoneNumber':'Please Enter Valid Phone Number'
    };

    // return config[validatorName];
  }

  static phoneNumberValidator(control: any){
    if(control.value.match('^((\\+91-?)|0)?[0-9]{10}$')){
      return null
    }
    else{
      return {'InvalidPhoneNumber':true}
    }
  }

  constructor() { }
}
