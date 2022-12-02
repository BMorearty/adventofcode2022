use literal::{map, MapLiteral};
use std::collections::HashMap;
use std::io::BufRead;
use std::{fs, io};

const FILENAME: &str = "data/input";

fn main() {
    let score = calc_score(choices1);
    println!("Part 1: {}", score);

    let score = calc_score(choices2);
    println!("Part 2: {}", score);
}

fn win_lose_draw_score(theirs: &str, mine: &str) -> u32 {
    let scores: HashMap<String, u32> = map! {
        "AX": 3u32,
        "AY": 6u32,
        "AZ": 0u32,

        "BX": 0u32,
        "BY": 3u32,
        "BZ": 6u32,

        "CX": 6u32,
        "CY": 0u32,
        "CZ": 3u32,
    };
    let combined = theirs.to_owned() + mine;
    return scores[&combined];
}

fn calc_score(choices: fn(line: &str) -> (&str, &str)) -> u32 {
    let values: HashMap<String, u32> = map! {"X": 1u32, "Y": 2u32, "Z": 3u32};
    let file = fs::File::open(FILENAME).expect("No such file");
    let mut buf = io::BufReader::new(file);
    let mut line: String = "".to_string();
    let mut score: u32 = 0;

    while let Ok(bytes) = buf.read_line(&mut line) {
        if bytes == 0 {
            break;
        }
        let (theirs, mine) = choices(&line);
        score += win_lose_draw_score(theirs, mine) + values[mine];
        line = "".to_string();
    }

    score
}

fn choices1(line: &str) -> (&str, &str) {
    let theirs = &line[0..1];
    let mine = &line[2..3];
    (theirs, mine)
}

fn choices2(line: &str) -> (&str, &str) {
    let theirs = &line[0..1];
    let win_lose_or_draw = &line[2..3];
    let mine = match (theirs, win_lose_or_draw) {
        ("A", "X") => "Z",
        ("A", "Y") => "X",
        ("A", "Z") => "Y",
        ("B", "X") => "X",
        ("B", "Y") => "Y",
        ("B", "Z") => "Z",
        ("C", "X") => "Y",
        ("C", "Y") => "Z",
        ("C", "Z") => "X",
        _ => "",
    };
    (theirs, mine)
}
