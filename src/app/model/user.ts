export class User {

  constructor() {
    this.completeName = '';
    this.objectId = '';
    this.password = '';
    this.phone = '';
    this.email = '';
    this.status = true;
    this.userType = '';
    this.index = -1;
  }




  index: number;
  objectId: string;
  password: string;
  completeName: string;
  email: string;
  phone: string;
  userType: string;
  status: boolean;
}