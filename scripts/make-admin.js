// Script to promote a user to admin role
// Usage: node scripts/make-admin.js user@example.com

const { db } = require('../src/lib/db');

async function makeAdmin(email) {
  try {
    const user = await db.users.findByEmail(email);
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }
    
    if (user.role === 'admin') {
      console.log(`User ${email} is already an admin`);
      return;
    }
    
    await db.users.update(user.id, { role: 'admin' });
    console.log(`✅ User ${email} has been promoted to admin`);
    
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    process.exit(1);
  }
}

const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address');
  console.error('Usage: node scripts/make-admin.js user@example.com');
  process.exit(1);
}

makeAdmin(email);
