import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    from: new FormControl(),
    to: new FormControl()
  })
  constructor() { }

  ngOnInit() {
  }

}
