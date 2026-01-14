import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL;

let redisClient: any = null;
let usingRedis = false;
const memoryStore = new Map<string, { value: string; expiresAt: number }>();

async function initRedis() {
    if (!REDIS_URL) return;
    if (redisClient) return;
    redisClient = createClient({ url: REDIS_URL });
    redisClient.on('error', (err: any) => console.error('Redis Error', err));
    await redisClient.connect();
    usingRedis = true;
}

export async function cacheGet(key: string) {
    if (REDIS_URL) {
        try {
            await initRedis();
            const v = await redisClient.get(key);
            return v;
        } catch (e) {
            console.error('Redis get error', e);
        }
    }

    const entry = memoryStore.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
        memoryStore.delete(key);
        return null;
    }
    return entry.value;
}

export async function cacheSet(key: string, value: string, ttlSec = 60) {
    if (REDIS_URL) {
        try {
            await initRedis();
            await redisClient.set(key, value, { EX: ttlSec });
            return;
        } catch (e) {
            console.error('Redis set error', e);
        }
    }

    const expiresAt = ttlSec ? Date.now() + ttlSec * 1000 : 0;
    memoryStore.set(key, { value, expiresAt });
}

export async function cacheDelPrefix(prefix: string) {
    if (REDIS_URL) {
        try {
            await initRedis();
            // Use SCAN to avoid blocking Redis with KEYS
            let cursor = '0';
            do {
                const res: any = await redisClient.scan(cursor, { MATCH: `${prefix}*`, COUNT: 100 });
                cursor = res[0];
                const keys = res[1];
                if (keys && keys.length) {
                    await redisClient.del(keys);
                }
            } while (cursor !== '0');
            return;
        } catch (e) {
            console.error('Redis del prefix error', e);
        }
    }

    for (const k of Array.from(memoryStore.keys())) {
        if (k.startsWith(prefix)) {
            memoryStore.delete(k);
        }
    }
}
