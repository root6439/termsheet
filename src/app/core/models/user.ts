import { Role } from './roles';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}
