const Data = require("../Models/dataModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const crc = require("crc");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// Define the polynomial and initial value for CRC-32
const CRC32_POLYNOMIAL = 0xedb88320;
const CRC32_INITIAL_VALUE = 0xffffffff;

function calculateCRC32(data) {
  const buffer = Buffer.from(JSON.stringify(data), "utf8"); // Convert JSON to buffer
  const crc32Value = crc.crc32(buffer, CRC32_INITIAL_VALUE, CRC32_POLYNOMIAL);
  return crc32Value;
}

//maintaining only the last 100 entries in the database based on the FiFo rule
async function maintain100Documents() {
  let dataCount = await Data.countDocuments();
  if (dataCount > 100) {
    const oldData = await Data.find()
      .sort("timestamp")
      .limit(dataCount - 100);

    // Delete the oldest entries
    for (const entry of oldData) {
      await Data.findByIdAndDelete(entry._id);
    }
  }
}

exports.sendData = catchAsyncErrors(async (req, res, next) => {
  const { structure, device_id } = req.body;
  const crc32Value = calculateCRC32(structure);
  structure.crc = crc32Value;
  const Rawdate = new Date(structure.unix_timestamp * 1000);
  let date = Rawdate.getDate();
  const month = Rawdate.getMonth();
  const year = Rawdate.getFullYear();
  actDate = `${date} ${month}`;

  console.log(`${date}-${month}`);

  //   console.log(`CRC-32 value: 0x${crc32Value.toString(16).toUpperCase()}`);

  const data = await Data.create({
    structure: structure,
    date: Rawdate,

    device_id: device_id,
  });
  await maintain100Documents();
  res.status(200).json({ success: true, data: data });
});
exports.getData = catchAsyncErrors(async (req, res, next) => {
  try {
    const data = await Data.find();
    let result = await Data.aggregate([
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, data: data, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});
