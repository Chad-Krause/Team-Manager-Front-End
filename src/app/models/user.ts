export class User {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    role: number;
    birthday: Date | null;
    graduationYear: number | null;
    yearJoined: number | null;
    confirmed: boolean;
    profilePictureUrl: string;

    constructor(response: any) {
        this.id = +response.id;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.nickname = response.nickname;
        this.email = response.email;
        this.role = +response.role;
        this.birthday = response.birthday ? new Date(response.birthday) : null;
        this.graduationYear = response.graduationYear ? +response.graduationYear : null;
        this.yearJoined = response.yearJoined ? +response.yearJoined : null;
        this.confirmed = response.confirmed;
        this.profilePictureUrl = response.profilePictureUrl;
    }

    getName(): string {
        return (this.nickname !== null) && (this.nickname.length > 1) ? this.nickname : `${this.firstName} ${this.lastName}`;
    }

    getProfilePicture(): string {
        return this.profilePictureUrl ? this.profilePictureUrl : 'assets/missing_profile.png'
    }

    getRole(): string {
        let role = '';
        switch (this.role) {
            case 1:
                role = 'Admin';
                break;
            case 2:
                role = 'Student';
                break;
            case 3:
                role = 'Mentor'
                break;
            case 4:
                role = 'Guardian';
                break;
            default:
                role = 'Unknown... Probably should be fixed';
        }

        return role;
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

export class HoursLogged {
    userid: number;
    totalTimeLogged: string;

    constructor(response: any) {
        this.userid = +response.userid;
        this.totalTimeLogged = response.totalTimeLogged;
    }
}

export const ACCOUNT_ROLES = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Student'},
    {id: 3, name: 'Mentor'},
    {id: 4, name: 'Guardian'}
]

export enum Roles {
    ADMIN = 1,
    STUDENT = 2,
    MENTOR = 3,
    GUARDIAN = 4
}