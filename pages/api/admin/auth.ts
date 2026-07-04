import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const PASSPHRASE = process.env.ADMIN_PASSPHRASE || '';
const SECRET = process.env.ADMIN_TOKEN_SECRET || 'portfolio-admin-secret';

export function generateToken(): string {
    const timestamp = Date.now().toString();
    const hmac = crypto.createHmac('sha256', SECRET).update(timestamp).digest('hex');
    return `${timestamp}.${hmac}`;
}

export function verifyToken(token: string): boolean {
    try {
        const [timestamp, hmac] = token.split('.');
        if (!timestamp || !hmac) return false;

        const expectedHmac = crypto.createHmac('sha256', SECRET).update(timestamp).digest('hex');
        if (hmac !== expectedHmac) return false;

        // Token expires after 24 hours
        const age = Date.now() - parseInt(timestamp, 10);
        if (age > 24 * 60 * 60 * 1000) return false;

        return true;
    } catch {
        return false;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }

    const { passphrase } = req.body;

    if (!PASSPHRASE) {
        return res.status(500).json({ error: 'Admin passphrase not configured' });
    }

    if (passphrase === PASSPHRASE) {
        const token = generateToken();
        return res.status(200).json({ token });
    }

    return res.status(401).json({ error: 'Invalid passphrase' });
}
