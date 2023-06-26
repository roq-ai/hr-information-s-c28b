import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PayslipInterface {
  id?: string;
  payment_date: any;
  amount: number;
  employee_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PayslipGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
}
