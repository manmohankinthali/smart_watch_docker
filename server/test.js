const crc = require("crc");

// Define the polynomial and initial value for CRC-32
const CRC32_POLYNOMIAL = 0xedb88320;
const CRC32_INITIAL_VALUE = 0xffffffff;

function calculateCRC32(data) {
  const buffer = Buffer.from(JSON.stringify(data), "utf8"); // Convert JSON to buffer
  const crc32Value = crc.crc32(buffer, CRC32_INITIAL_VALUE, CRC32_POLYNOMIAL);
  return crc32Value;
}

const data = {
  structure: {
    latitude_dec: 34567,
    latitude_frac: 12345,
    longitude_dec: -123456,
    longitude_frac: -67890,
    unix_timestamp: 1667830800,
    panic_switch: 1,
    sos_switch: 0,
    gsm_msg: 35,
    battery_left: 30,
    touch_pos_x: 640,
    touch_pos_y: 480,
  },
};

const crc32Value = calculateCRC32(data);

// console.log(`CRC-32 value: 0x${crc32Value.toString(16).toUpperCase()}`);
console.log(crc32Value);
