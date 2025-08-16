mod printer_status;
mod print_text;
use printer_status::get_printer_status;
use print_text::print_text;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_printer_status, print_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
