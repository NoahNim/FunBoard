export interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    biography: string;
    profilePhoto: File;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IGenericResponse {
    status: string;
    message: string;
  }
  