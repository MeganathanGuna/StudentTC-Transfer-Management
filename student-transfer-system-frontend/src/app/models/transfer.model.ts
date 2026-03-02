export interface TransferRequest {
  id?: number;
  studentId: number;
  currentSchool: string;
  targetSchool: string;
  reason: string;
  status: 'PENDING' | 'INSPECT' | 'APPROVED' | 'REJECTED';
  remarks?: string;
}