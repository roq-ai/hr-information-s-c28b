import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { payslipValidationSchema } from 'validationSchema/payslips';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.payslip
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPayslipById();
    case 'PUT':
      return updatePayslipById();
    case 'DELETE':
      return deletePayslipById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPayslipById() {
    const data = await prisma.payslip.findFirst(convertQueryToPrismaUtil(req.query, 'payslip'));
    return res.status(200).json(data);
  }

  async function updatePayslipById() {
    await payslipValidationSchema.validate(req.body);
    const data = await prisma.payslip.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePayslipById() {
    const data = await prisma.payslip.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
