import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.less']
})
export class ReactiveFormComponent implements OnInit {

  //如果将这个username与页面上的表单联系起来的话,那么这个表单的初始值就是aaa
  username:FormControl = new FormControl("aaa")

  //创建一个FormGroup
  formModel:FormGroup = new FormGroup({
    //里面包含一个起始日期和一个终止日期
    //声明一个FormGroup
    dateRange:new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    }),
    //创建一个 FormArray,这个也要在FormGroup范围内使用
    emails:new FormArray([
      new FormControl("aaa.com"),
      new FormControl("bbb.com"),
      new FormControl("ccc.com"),
    ])
  })

  
  constructor() { }

  ngOnInit() {
  }
  addEmail(){
    let emails = this.formModel.get("emails") as FormArray
    emails.push(new FormControl())
  }

  OnSubmit(){
    console.log(this.formModel.value)
  }
}
