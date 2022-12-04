use std::fs::File;
use std::io::{BufRead, Read};
use std::{env, fs, io};

fn main() {
    let filename = get_filename();
    let file = fs::File::open(filename).expect("No such file");
    let mut buf = io::BufReader::new(file);
    let data = read(&mut buf);
    // part1(&data);
    // part2(&data);
}

fn get_filename() -> String {
    env::args()
        .nth(1)
        .expect("Specify an input file")
        .to_string()
}

fn read(buf: &mut io::BufReader<File>) {
    let mut result: Vec<&str> = Vec::new();
    for line in buf.by_ref().lines() {
        let line = line.expect("Unable to read file");
        let sides: Vec<String> =
            line.split(",").map(|s| s.to_string()).collect();
        // let parts = sides.iter().map(|side| {
        //     side.split("-")
        //         .collect::<Vec<String>>()
        //         .iter()
        //         .map(|id| id.parse::<u32>().expect("Unable to parse number"))
        // });
        // println!("{:?}", sides);
        // result.push(parts);
    }
}

// fn part1(buf: &mut io::BufReader<File>) {
// }
//
// fn part2(buf: &mut io::BufReader<File>) {
// }
