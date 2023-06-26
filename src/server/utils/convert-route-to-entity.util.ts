const mapping: Record<string, string> = {
  companies: 'company',
  payslips: 'payslip',
  users: 'user',
  'vacation-requests': 'vacation_request',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
