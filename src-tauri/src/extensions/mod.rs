pub mod functions;
pub mod themes;
use themes::{get_custom_stylesheet_filepath, install_themes};

use crate::storage;
use crate::ARGS_STRUCT;
use std::path::Path;
extern crate path_absolutize;
use path_absolutize::*;

#[derive(serde::Serialize)]
pub struct ArgsStruct {
    dirs: Vec<String>,
    is_reveal: bool,
    custom_style_sheet: serde_json::Value,
}

#[tauri::command]
pub fn get_cli_args() -> Result<ArgsStruct, String> {
    let custom_style_sheet = match get_custom_stylesheet_filepath() {
        None => serde_json::Value::default(),
        Some(style_sheet) => {
            serde_json::from_str(std::fs::read_to_string(style_sheet).unwrap().as_str())
                .unwrap_or_default()
        }
    };
    let dirs = match ARGS_STRUCT.values_of("dir") {
        Some(dirs_arg) => Some(
            dirs_arg
                // FIXME: Should it be absolute path?
                .map(|s| match Path::new(s).absolutize() {
                    Ok(s) => s.to_string_lossy().to_string(),
                    Err(e) => e.to_string(),
                })
                .collect(),
        ),
        None => None,
    };

    Ok(ArgsStruct {
        dirs: dirs.unwrap_or_default(),
        is_reveal: ARGS_STRUCT.occurrences_of("reveal") > 0,
        custom_style_sheet,
    })
}

pub fn install_extensions(extension: serde_json::Value) {
    // Check the type of packaged extension
    if extension
        .get("extensionType")
        .unwrap_or(&serde_json::Value::Null)
        != "theme"
    {
        panic!("Only theme extension is supported right now");
    }
    install_themes(extension);
}

pub fn uninstall_extensions(extension_identifier: String) {
    let extensions = storage::read_data("extensions");
    let mut extensions = match extensions {
        Ok(config) => {
            if config.status {
                config.data
            } else {
                serde_json::json!({})
            }
        }
        Err(_) => {
            serde_json::json!({})
        }
    };
    // Iterate on every object of extensions and iterate extensions key of the object and remove the extension
    let extensions = extensions.as_object_mut().unwrap().clone();
    let mut new_extensions = serde_json::json!({}).as_object_mut().unwrap().clone();
    for (key, value) in extensions {
        let value = value.as_array().unwrap().clone();
        let new_value = value
            .iter()
            .filter(|ext| {
                let _empty_string = serde_json::Value::String("".to_string());
                let ext_identifier = ext.get("identifier").unwrap_or(&_empty_string);
                if key == "themes" && ext_identifier == &extension_identifier {
                    let theme = storage::read_data("theme");
                    let theme = match theme {
                        Ok(config) => {
                            if config.status {
                                config.data
                            } else {
                                serde_json::json!({})
                            }
                        }
                        Err(_) => {
                            serde_json::json!({})
                        }
                    };
                    let theme = theme.as_object().unwrap().clone();
                    let current_active_theme = theme
                        .get("theme")
                        .unwrap_or(&serde_json::Value::String("".to_string()))
                        .to_string();

                    let current_active_theme =
                        current_active_theme.split("@").collect::<Vec<_>>()[0].to_string();
                    // If the current_active_theme starts with unused " character, remove it
                    let current_active_theme = if current_active_theme.starts_with("\"") {
                        current_active_theme.split_at(1).1.to_string()
                    } else {
                        current_active_theme
                    };
                    let current_active_theme = serde_json::Value::String(current_active_theme);
                    if &current_active_theme == ext_identifier {
                        storage::write_data(
                            "theme",
                            serde_json::json!({"theme": "System Default"}),
                        );
                    }
                }
                ext_identifier != &extension_identifier
            })
            .cloned()
            .collect::<Vec<_>>();
        new_extensions.insert(key.to_string(), serde_json::json!(new_value));
    }
    storage::write_data("extensions", serde_json::json!(new_extensions));
}

pub async fn init_extension() {
    // Initalize themes extension config
    themes::init_theme_extension().await;
    functions::init_functions_extension().await;
}