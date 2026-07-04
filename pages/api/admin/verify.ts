import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }

    const { token } = req.body;

    if (!token || !verifyToken(token)) {
        return res.status(401).json({ valid: false });
    }

    return res.status(200).json({ valid: true });
}
