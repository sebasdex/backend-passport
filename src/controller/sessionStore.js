import { PrismaClient } from "@prisma/client";
import session from "express-session";

const PrismaStore = session.Store;
const prisma = new PrismaClient();

class PrismaSessionStore extends PrismaStore {
    constructor() {
        super();
    }

    async get(sid, callback) {
        try {
            const session = await prisma.session.findUnique({
                where: { sid },
            });

            if (!session) return callback(null, null);

            const now = new Date();
            if (session.expire < now) {
                await this.destroy(sid, () => { });
                return callback(null, null);
            }

            callback(null, session.sess);
        } catch (err) {
            callback(err);
        }
    }

    // Crea o actualiza una sesión
    async set(sid, sess, callback) {
        try {
            const now = new Date();
            const expire = new Date(now.getTime() + sess.cookie.maxAge);

            await prisma.session.upsert({
                where: { sid },
                create: { sid, sess, expire },
                update: { sess, expire },
            });

            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    async destroy(sid, callback) {
        try {
            await prisma.session.delete({ where: { sid } });
            callback(null);
        } catch (err) {
            callback(err);
        }
    }
}

export default PrismaSessionStore;
