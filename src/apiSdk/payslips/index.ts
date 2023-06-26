import axios from 'axios';
import queryString from 'query-string';
import { PayslipInterface, PayslipGetQueryInterface } from 'interfaces/payslip';
import { GetQueryInterface } from '../../interfaces';

export const getPayslips = async (query?: PayslipGetQueryInterface) => {
  const response = await axios.get(`/api/payslips${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPayslip = async (payslip: PayslipInterface) => {
  const response = await axios.post('/api/payslips', payslip);
  return response.data;
};

export const updatePayslipById = async (id: string, payslip: PayslipInterface) => {
  const response = await axios.put(`/api/payslips/${id}`, payslip);
  return response.data;
};

export const getPayslipById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/payslips/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePayslipById = async (id: string) => {
  const response = await axios.delete(`/api/payslips/${id}`);
  return response.data;
};
