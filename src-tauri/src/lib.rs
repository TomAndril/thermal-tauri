mod printer;
use printer::get_printer_status;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_printer_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
