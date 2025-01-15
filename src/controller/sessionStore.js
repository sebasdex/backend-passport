import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const prismaStore = {
    async get(sid, callback) {
        try {
            const session = await prisma.session.findUnique({
                where: { sid },
            });

            if (!session) {
                return callback(null, null);
            }

            const now = new Date();
            if (session.expire < now) {
                await prismaStore.destroy(sid, () => { });
                return callback(null, null);
            }

            callback(null, session.sess);
        } catch (err) {
            callback(err);
        }
    },

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
    },

    async destroy(sid, callback) {
        try {
            await prisma.session.delete({
                where: { sid },
            });

            callback(null);
        } catch (err) {
            callback(err);
        }
    },
};

export default prismaStore;
