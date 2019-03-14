import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  //1.声明一个formGroup 是整个数据结构
  formModel:FormGroup
  constructor() {
    //在构造函数中声明formGroup 这个属性,是一个对象,里面有用户名,手机号两个表单 formControl , 还有一个formGroup 里面是密码和确认密码
    this.formModel = new FormGroup({
      username:new FormControl(),
      mobile:new FormControl(),
      passwordsGroup:new FormGroup({
        password:new FormControl(),
        pconfirm:new FormControl()
      })
    })
  }

  ngOnInit() {
  }
  OnSubmit(){
    console.log(this.formModel.value)
  }

}
