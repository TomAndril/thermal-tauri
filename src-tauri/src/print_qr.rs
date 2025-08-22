use escpos::driver::*;
use escpos::printer::Printer;
use escpos::utils::*;
use serde_json::{json, Value};

fn format_text(text: String) -> String {
    let space = "\n";
    let formatted_text = format!("{}\n{}", text, space);
    formatted_text
}

#[tauri::command]
pub fn print_qr(title: String, link: String) -> Result<Value, String> {
    let driver = UsbDriver::open(0x6868, 0x0200, None, None)
        .map_err(|e| format!("Failed to open USB driver: {}", e))?;

    Printer::new(driver, Protocol::default(), None)
        .debug_mode(Some(DebugMode::Dec))
        .init()
        .map_err(|e| format!("Failed to initialize printer: {}", e))?
        .page_code(PageCode::PC858)
        .map_err(|e| format!("Failed to set page code: {}", e))?
        .justify(JustifyMode::CENTER)
        .map_err(|e| format!("Failed to justify text: {}", e))?
        .size(2, 3)
        .map_err(|e| format!("Failed to set size: {}", e))?
        .writeln(&format_text(title))
        .map_err(|e| format!("Failed to write text: {}", e))?
        .qrcode_option(link.as_str(), QRCodeOption::new(QRCodeModel::Model1, 32, QRCodeCorrectionLevel::M))
        .map_err(|e| format!("Failed to write QR code: {}", e))?
        .print_cut()
        .map_err(|e| format!("Failed to print and cut: {}", e))?;

    Ok(json!({
        "status": "success",
    }))
}
