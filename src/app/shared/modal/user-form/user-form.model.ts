import { AnyAaaaRecord } from 'dns';

export interface UserAddModel {
  Name: string;
  Email: string;
  Password: string;
  Contact: string;
  profile: string | Blob;
  City: string;
  userRole: any;
  userId: number;
}
