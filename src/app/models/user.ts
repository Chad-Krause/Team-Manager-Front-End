export class User {
}

export class UserRegistration {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(form: any) {
        this.firstname = form.first;
        this.lastname = form.last;
        this.email = form.email;
        this.password = form.password;
        this.confirmPassword = form.passwordConfirm;
    }
}

export class UserRegistrationResponse {
    userid: number;
}

export class UserLogin {
    email: string;
    password: string;
}

export class UserLoginResponse {
    token: string;
    user: User;
}
