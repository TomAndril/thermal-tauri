use escpos::driver::*;
use serde_json::{json, Value};

#[tauri::command]
pub fn get_printer_status() -> Result<Value, String> {
    let driver = UsbDriver::open(0x6868, 0x0200, None, None);

    match driver {
        Ok(_driver) => Ok(json!({
            "status": "connected",
        })),
        Err(_e) => Ok(json!({
            "status": "disconnected",
        })),
    }
}
