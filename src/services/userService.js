const prisma = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

exports.list = async () => {
    return await prisma.user.findMany();
}

exports.register = async (userData) => {
    const { username, password } = userData;
    const hash = await hashPassword(password)
    const newUser = await prisma.user.create({
        data: {
            username,
            password: hash
        }
    })
    return newUser
}

exports.login = async (username,password) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user);
    return { token, user };
}