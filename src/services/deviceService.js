const prisma = require('../config/db');

exports.list = async () => {
    return await prisma.device.findMany();
}

exports.create = async (device) => {
    return await prisma.device.create({
        data: device
    });
}

