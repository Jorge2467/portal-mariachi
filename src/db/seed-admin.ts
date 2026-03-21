import { db } from './index';
import { users } from './schema';
import 'dotenv/config';

async function main() {
  console.log('Elevating users to ADMIN...');
  try {
    const result = await db.update(users).set({ role: 'admin' }).returning();
    console.log(`Elevated ${result.length} users to Admin.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to elevate:', error);
    process.exit(1);
  }
}
main();
