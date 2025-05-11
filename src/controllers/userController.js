const userService = require('../services/userService');

const userList = async (req, res) => {
    try {
        const users = await userService.list()
        res.status(200).json(
            { message: 'Get Users', users }
        )
    } catch (err) {
        console.error(err);
        res.status(500).json(
            { error: 'Failed to get users', message: err.message }
        )
    }
}

    const register = async (req, res) => {
        const { username, password } = req.body
        try {
            const newUser = await userService.register({ username, password })
            res.status(201).json({ message: 'Create User', user: newUser })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to register user', message: err.message })
        }
    }

    const login = async (req, res) => {
        const {username,password} = req.body
        try{
            const {token,user} = await userService.login(username,password)
            res.status(200).json({
                message: 'Login successful',
                token,
                user:{id:user.id ,username:user.username}
            })
        } catch(err){
            console.error(err);
            res.status(500).json({ error: 'Failed to login user', message: err.message })
        }
    }

    module.exports = {
        register,
        userList,
        login,
    }