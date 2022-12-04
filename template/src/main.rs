use std::io::{BufRead, Seek};
use std::{env, fs, io};
use std::fs::File;
use std::io::SeekFrom::Start;

fn main() {
    let filename = get_filename();
    let file = fs::File::open(filename).expect("No such file");
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
    for line in buf.by_ref().lines() {
        let line = line.expect("Unable to read file");
    }
}

fn part2(buf: &mut io::BufReader<File>) {
    for line in buf.by_ref().lines() {
        let line = line.expect("Unable to read file");
    }
}
