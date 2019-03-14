import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  //自定义校验器:
  /* 就是一个普通的方法,方法的名字随便写,方法中必须传入一个参数,这个参数的类型必须是 AbstractControl类型的,然后必须有一个返回值,这个返回值可以是任意类型的对象,对这个对象只有一个要求,它的key必须是string类型的,值可以是任意类型的 */
  /* xxx(control:AbstractControl):{[key:string]:any}{
    return null
  } */
  //那么我们来定义一个校验mobile的方法吧
  mobileValidator(control:FormControl):any{
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    let valid = myreg.test(control.value)
    console.log("mobile的校验结果是"+valid);
    return valid ? null : {mobile : true}
    
  }
  //将上面这个校验方法与mobile表单绑定之后,每次表单内容改变,都会触发这个方法
  //接下来创建一个自定义校验器,来同时校验密码和确认密码
  equalValidator(group:FormGroup):any{
    let password:FormControl = group.get("password") as FormControl
    let pconfirm:FormControl = group.get("pconfirm") as FormControl
    let valid:boolean = (password.value === pconfirm.value)
    console.log("密码的校验结果是"+valid);
    //当校验通过的时候,返回null
    return valid ? null : {equal : true}
  }
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
    //angular有一些自定义的校验器,这些校验器都是在 validators中的,这些检验器可以传入到formControl中进行校验,如果有多个校验,可以用数组,可以在提交的方法里面看这个字段是否合法
    this.formModel = fb.group({
      username:['',Validators.required],
      mobile:['',this.mobileValidator],
      passwordsGroup:fb.group({
        password:[''],
        pconfirm:['']
      },{validators:this.equalValidator})
    })
  }

  ngOnInit() {
  }
  OnSubmit(){
    let isValid:boolean = this.formModel.get("username").valid
    console.log("username的校验结果是"+ isValid);  //username的校验结果是false
    //还可以获取校验错误的信息
    let errors:any = this.formModel.get("username").errors
    console.log("username的错误信息是"+ JSON.stringify(errors));  //username的错误信息是{"required":true}
    console.log(this.formModel.value)
  }

}
