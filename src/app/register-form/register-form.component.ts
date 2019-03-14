import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  //1.声明一个formGroup 是整个数据结构
  formModel:FormGroup
  constructor(fb:FormBuilder) {
    //在构造函数中声明formGroup 这个属性,是一个对象,里面有用户名,手机号两个表单 formControl , 还有一个formGroup 里面是密码和确认密码
    /* this.formModel = new FormGroup({
      username:new FormControl(),
      mobile:new FormControl(),
      passwordsGroup:new FormGroup({
        password:new FormControl(),
        pconfirm:new FormControl()
      })
    }) */
    //以上代码很多了,angular有一种服务 FormBuilder 可以帮助我们简化,在constructor中注入服务
    //注入服务之后,new FormGroup 可以替换成 fb.group 这个方法中还可以传入第二个参数,可以用来校验这个formGroup,此外
    //还可以用数组来实例化一个FormControl , 所以将new FormControl()直接替换成 [''] , 数组的第一个元素是 formControl的初始值,第二个元素是一个校验方法,第三个元素是一个异步校验方法
    this.formModel = fb.group({
      username:[''],
      mobile:[''],
      passwordsGroup:fb.group({
        password:[''],
        pconfirm:['']
      })
    })
  }

  ngOnInit() {
  }
  OnSubmit(){
    console.log(this.formModel.value)
  }

}
