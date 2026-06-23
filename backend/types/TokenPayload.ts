import { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
	userId: string;
}

export default TokenPayload;
