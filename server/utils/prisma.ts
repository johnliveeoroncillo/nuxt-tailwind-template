import { PrismaClient } from '@prisma/client';
import pg from 'pg';
const { Client: PgClient } = pg;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// PostgreSQL LISTEN setup
const pgClient = new PgClient({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
});

pgClient.connect().then(() => {
  console.log('Listening for database changes...');
  pgClient.query('LISTEN table_updates');
});

pgClient.on('notification', (msg: any) => {
  console.log('pgClient notification', msg);
  try {
    const payload = JSON.parse(msg.payload ?? '{}');
    const { table, operation, data } = payload;
    console.log(`🔔 Change detected in table ${table}:`, payload);
    // Broadcast using WebSockets or another mechanism if needed
  } catch (err) {
    console.error('Error processing notification:', err);
  }
});

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
