export class User {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    role: number;
    birthday: Date;
    graduationYear: number;
    yearJoined: number;
    confirmed: boolean;

    constructor(response: any) {
        this.id = +response.id;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.nickname = response.nickname;
        this.email = response.email;
        this.role = +response.role;
        this.birthday = new Date(response.birthday);
        this.graduationYear = +response.graduationYear;
        this.yearJoined = +response.yearJoined;
        this.confirmed = response.confirmed;
    }
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
