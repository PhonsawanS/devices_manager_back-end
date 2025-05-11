const csv = require('csv-parser');
const { Readable } = require('stream');
const deviceService = require('../services/deviceService');

const listDevices = async (req, res) => {
    try {
        const devices = await deviceService.list();
        res.status(200).json({
            message: 'Get Devices',
            devices
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createDevice = async (req, res) => {
  try {
    const newDevice = await deviceService.create(req.body);
    res.status(201).json({ message: 'Create Device', device: newDevice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register device', message: err.message });
  }
}

const importDevices = async (req, res) => {
  try {
    const results = [];

    // แปลง Buffer เป็น Stream
    const stream = Readable.from(req.file.buffer);

    stream
     .pipe(csv())
      .on('data', (data) => {
        // แปลง key ทั้งหมดเป็นพิมพ์เล็ก
        const normalizedData = {};
        Object.keys(data).forEach((key) => {
          normalizedData[key.toLowerCase()] = data[key];
        });

        results.push({
          username: normalizedData.username,
          department: normalizedData.department,
          license: normalizedData.license,
          installed: normalizedData.installed,
          brand: normalizedData.brand,
          model: normalizedData.model,
          serial: normalizedData.serial
        });
      })
      .on('end', async () => {
        await Promise.all(results.map(device => deviceService.create(device)));
        res.status(201).json({ message: 'CSV imported successfully', count: results.length });
      });
  } catch (err) {
    console.error('Import error:', err);
    res.status(500).json({ error: 'Failed to import CSV', message: err.message });
  }
};



module.exports = {
    listDevices,
    createDevice,
    importDevices,
}