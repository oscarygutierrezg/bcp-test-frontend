import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { InfoDialogComponent } from 'src/app/angular-material/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
    loginForm: FormGroup = this.setFormControl();
    loading = false;
    submitted = false;
    user: User = new User;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router,
    ) {
    }
      setFormControl(): FormGroup {
        this.user = new User();
       return this.formBuilder.group({
            username: [this.user.email, [Validators.required, Validators.email] ],
            password: [this.user.password, Validators.required]
        });

      }

    ngOnInit() {
        
        this.reiniciarForm();
        // get return url from route parameters or default to '/'
  //      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    markAsTouched() {
      const controls = [
        this.loginForm.get('username'),
        this.loginForm.get('password')
      ];
      for (const c of controls) {
        if (c?.invalid) {
          c?.markAsTouched();
        }
      }
    }

    onSubmit() {
      if (this.loginForm.valid) {
      this.user.email = this.loginForm.get('username')?.value;
      this.user.password = this.loginForm.get('password')?.value;
      this.userService.authenticate(this.user).subscribe(
            (result) => {
              JSON.stringify(result)
              if(result){
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('token', result.token);
                this.reiniciarForm();
                this.router.navigate(['/changes']);
              }
              else{
                this.showModal('Error en login', JSON.stringify(result));
          
              }
            
            },
            (error) => {
              console.log(error);
                this.showModal('Error en login', error.message);
            
            }
        );
        } else {
          this.markAsTouched();
        }
    }

    showModal(title: string, body: string) {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          height: '170px',
          //width: '300px',
          data: {
            title,
            body,
          }
        });
    }

    reiniciarForm() {
      this.loginForm.reset();
  }
}
