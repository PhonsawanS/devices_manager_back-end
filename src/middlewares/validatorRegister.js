const prisma = require('../config/db');

const validatorRegister = async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json(
            { error: 'Missing required fields' }
        )
    }

    if (password.length < 8) {
        return res.status(400).json(
            { error: 'Password must be at least 8 characters' }
        )
    }

    try {
        const mathedUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (mathedUsername) {
            return res.status(400).json(
                { error: 'username already exists' }
            )
        }

    } catch (err) {
        console.error('Prisma error:', err)
        return res.status(500).json(
            { error: 'Server error during username check' }
        )
    }

    next()
}

module.exports = { validatorRegister }