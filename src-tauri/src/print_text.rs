use escpos::driver::*;
use escpos::printer::Printer;
use escpos::utils::*;
use serde_json::{json, Value};

fn format_text(text: String) -> String {
    let line: String = "-".repeat(32);
    let line_break = "\n".to_string().repeat(4);

    let formatted_text = format!(
        "{}\n{}\n{}\n{}\n{}",
        line, line_break, text, line_break, line
    );

    formatted_text
}

#[tauri::command]
pub fn print_text(text: String) -> Result<Value, String> {
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
        .writeln(&format_text(text))
        .map_err(|e| format!("Failed to write text: {}", e))?
        .print_cut()
        .map_err(|e| format!("Failed to print and cut: {}", e))?;

    Ok(json!({
        "status": "success",
    }))
}
