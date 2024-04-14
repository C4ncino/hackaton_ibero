type user = {
     Id: number,
     Name: string,
     LastName: string,
     BirthDate: string,
     Email: string,
     PhoneNumber: string,
     UserType: 'd' | 'p',
} | null


type SessionContextModel = {
     user: user
     token: string,
     signup: (firstName: string, lastName: string, experienceYears: number, birthDate: string, email: string, password: string, type: boolean, contactEmail: string) => Promise<boolean>,
     login: (username: string, password: string) => Promise<boolean>
}