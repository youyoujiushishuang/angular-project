import {FormControl , FormGroup} from "@angular/forms"
import { observable, Observable } from 'rxjs';
//自定义校验器:
/* 就是一个普通的方法,方法的名字随便写,方法中必须传入一个参数,这个参数的类型必须是 AbstractControl类型的,然后必须有一个返回值,这个返回值可以是任意类型的对象,对这个对象只有一个要求,它的key必须是string类型的,值可以是任意类型的 */
/* xxx(control:AbstractControl):{[key:string]:any}{
return null
} */
//单独抽离出来之后,就不再是组件中的方法了,而是全局的方法,用function声明并且暴露出去
//然后在组件中使用的时候,先导入这个方法,就可以直接使用这两个方法了,不用再用 this点出来
//那么我们来定义一个校验mobile的方法吧
export function mobileValidator(control:FormControl):any{
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    let valid = myreg.test(control.value)
    console.log("mobile的校验结果是"+valid);
    return valid ? null : {mobile : true}
}
//将手机号校验器改造成异步校验器
export function mobileAsyncValidator(control:FormControl):any{
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    let valid = myreg.test(control.value)
    console.log("mobile的校验结果是"+valid);
    //此处有错误: Observable.of 不是一个function
    // return Observable.of(valid ? null : {mobile : true})
}
//将上面这个校验方法与mobile表单绑定之后,每次表单内容改变,都会触发这个方法
//接下来创建一个自定义校验器,来同时校验密码和确认密码
export function equalValidator(group:FormGroup):any{
let password:FormControl = group.get("password") as FormControl
let pconfirm:FormControl = group.get("pconfirm") as FormControl
let valid:boolean = (password.value === pconfirm.value)
console.log("密码的校验结果是"+valid);
//当校验通过的时候,返回null
return valid ? null : {equal : {descxxx:"密码和确认密码不一致"}}
}