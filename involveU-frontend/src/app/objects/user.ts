export interface User {
  studentID?: number;
  firstName: string;
  lastName: string;
  year?: string;
  email?: string;
  pronouns?: string;
  isAdmin?: number;
  isEboard?: number;
  userPassword?: string;
  eboardPosition?: string;
}
