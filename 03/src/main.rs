use std::fs::File;
use std::io::SeekFrom::Start;
use std::io::{BufRead, Read, Seek};
use std::{env, io};

fn main() {
    let filename = get_filename();
    let file = File::open(filename).expect("No such file");
    let mut buf = io::BufReader::new(file);
    part1(&mut buf);
    let _ = buf.seek(Start(0));
    part2(&mut buf);
}

fn get_filename() -> String {
    env::args()
        .nth(1)
        .expect("Specify an input file")
        .to_string()
}

fn part1(buf: &mut io::BufReader<File>) {
    let mut points: u32 = 0;
    for line in buf.by_ref().lines() {
        let line = line.expect("Unable to read file");
        let (a, b) = line.split_at(line.len() / 2);
        for ch in a.chars() {
            if b.contains(ch) {
                points += score(ch);
                break;
            }
        }
    }
    println!("Part 1: {}", points);
}

fn score(ch: char) -> u32 {
    if ch.is_ascii_uppercase() {
        ((ch as u8) - ('A' as u8) + 27) as u32
    } else {
        ((ch as u8) - ('a' as u8) + 1) as u32
    }
}

fn part2(buf: &mut io::BufReader<File>) {
    let mut points: u32 = 0;
    let mut i = 0;
    let mut group: Vec<String> = Vec::new();
    for line in buf.by_ref().lines() {
        let line = line.expect("Unable to read file");
        group.push(line);
        if i == 2 {
            for ch in group[0].chars() {
                if group[1].contains(ch) && group[2].contains(ch) {
                    points += score(ch);
                    break;
                }
            }
            group.clear();
        }
        i = (i + 1) % 3;
    }
    println!("Part 2: {}", points);
}
