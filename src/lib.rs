use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct Rand {
    value: f32,
    date: String,
}

#[wasm_bindgen]
pub fn get_max(rand_times: &str) -> String {
    // Loop through all json data, and find max
    let data: HashMap<String, String> = serde_json::from_str(rand_times).unwrap();
    let mut record = Rand {value: 0.0, date: "".to_string()};

    for (k, v) in &data {
        let v_int: f32 = v.parse().unwrap();
        if &v_int > &record.value {
            record = Rand { value: v_int, date: k.to_string() };
        }
    }
    return serde_json::to_string(&record).unwrap();
}

#[wasm_bindgen]
pub fn get_min(rand_times: &str) -> String {
    // Loop through all json data, and find min
    let data: HashMap<String, String> = serde_json::from_str(rand_times).unwrap();
    let mut record = Rand {value: 999.0, date: "".to_string()};

    for (k, v) in &data {
        let v_int: f32 = v.parse().unwrap();
        if &v_int < &record.value {
            record = Rand { value: v_int, date: k.to_string() };
        }
    }
    return serde_json::to_string(&record).unwrap();
}
