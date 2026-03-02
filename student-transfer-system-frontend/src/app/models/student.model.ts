export interface Student {
  id?: number;
  name: string;
  regId: string;
  dob: string;
  phone: string;
  school: string;
  password?: string; // not sent back usually
}