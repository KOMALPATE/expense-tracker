import { Component } from '@angular/core';
import { SalaryForm } from './salary-form/salary-form';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [SalaryForm, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
