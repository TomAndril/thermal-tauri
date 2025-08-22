mod print_qr;
mod print_text;
mod printer_status;

use print_qr::print_qr;
use print_text::print_text;
use printer_status::get_printer_status;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_printer_status,
            print_text,
            print_qr
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
