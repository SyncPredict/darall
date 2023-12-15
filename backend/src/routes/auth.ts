import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import {PrismaClient, User} from '@prisma/client';

import {Router} from 'express';
import jwt from 'jsonwebtoken';

// import bcrypt from 'bcrypt';

export function authenticator(prisma: PrismaClient) {
    const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'YOUR_SECRET_KEY', // Замените на ваш секретный ключ
    };

    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({where: {id: jwt_payload.sub}});
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    }));

    function authenticate(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', {session: false}, (err: Error | null, user: User | false, info: any) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({message: "Unauthorized"});
            req.user = user;
            next();
        })(req, res, next);
    }

    return authenticate
}


export function authRoutes(prisma: PrismaClient) {
    const router = Router();

    router.post('/', async (req, res) => {
        const {email, password} = req.body;
        if (email && password) {
            const user = await prisma.user.findUnique({where: {email: email}});
            if (!user || !await isPasswordValid(password, user.password)) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const token = jwt.sign({sub: user.id}, 'YOUR_SECRET_KEY', {expiresIn: '1h'});
            res.json({token});
        } else
            return res.status(401).json({message: "Unauthorized"});
    });

    async function isPasswordValid(providedPassword: string, actualPassword: string): Promise<boolean> {
        // return bcrypt.compare(providedPassword, actualPassword);
        return providedPassword === actualPassword;
    }

    return router;
}


