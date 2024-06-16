export type UserProperties = { 
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    constructor({ id, email, password, firstName, lastName }: UserProperties) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}