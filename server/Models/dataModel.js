const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  structure: {
    latitude_dec: {
      type: String,
    },
    latitude_frac: {
      type: String,
    },
    longitude_dec: {
      type: String,
    },
    longitude_frac: {
      type: String,
    },
    unix_timestamp: {
      type: String,
    },
    panic_switch: {
      type: String,
    },
    sos_switch: {
      type: String,
    },
    gsm_msg: {
      type: String,
    },
    battery_left: {
      type: String,
    },
    touch_pos_x: {
      type: String,
    },
    touch_pos_y: {
      type: String,
    },
    crc: {
      type: String,
    },
  },
  device_id: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});
const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
// * latitude_dec (u16)
// * latitude_frac (u16)
// * longitude_dec (u16)
// * longitude_frac (u16)
// * unix_timestamp (u32)
// * panic_switch (u8)
// * sos_switch (u8)
// * gsm_msg (u8)
// * battery_left (u8)
// * touch_pos_x (u16)
// * touch_pos_y (u16)
// * crc (u32)
