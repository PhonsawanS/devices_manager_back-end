const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter/user.Routes')
const deviceRouter = require('./deviceRouter/device.Routes')

const RouterList = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/devices',
        route: deviceRouter
    }
]

RouterList.forEach((r) => {
    router.use(r.path, r.route);
});


module.exports = router