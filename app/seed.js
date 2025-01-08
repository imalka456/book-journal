import bcrypt from 'bcrypt';

// Hash the password before saving
const hashPassword = async (password) => {
    const saltRounds = 10; // Higher means more secure but slower
    return await bcrypt.hash(password, saltRounds);
};

// Example: Hash a password
const hashedPassword = await hashPassword('123456');
console.log(hashedPassword);
