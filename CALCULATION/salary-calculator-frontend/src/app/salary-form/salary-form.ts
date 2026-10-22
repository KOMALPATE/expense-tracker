import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salary-form',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './salary-form.html',
  styleUrl: './salary-form.css',
})
export class SalaryForm {
  salary = {
    employee_id: null,
    basic_salary: 0,
    hra: 0,
    allowances: 0,
    deductions: 0,
  };

  constructor(private http: HttpClient) {}

  saveSalary() {
    const data = {
      employee_id: this.salary.employee_id,
      basic_salary: this.salary.basic_salary,
      hra: this.salary.hra || 0,
      allowances: this.salary.allowances || 0,
      deductions: this.salary.deductions || 0,
    };

    console.log('Salary Data:', data);

    this.http.post('http://localhost:5000/api/salary', data).subscribe({
      next: (response: any) => {
        console.log('RESPONSE:', response);
        alert('Salary saved successfully!');
      },
      error: (error) => {
        console.log('ERROR:', error);
        alert('Salary not saved: ' + (error?.error?.message || error?.message || 'server unreachable'));
      },
    });
  }
}
