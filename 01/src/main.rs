use std::env;
use std::fs;
use std::io;
use std::io::BufRead;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();
    let elves = match args.get(1) {
        None => {
            println!("Please provide a data file");
            process::exit(1);
        }
        Some(datafile) => elves(datafile),
    };

    // Sum each elf's calories
    let mut elves: Vec<i32> = elves.iter().map(|elf| elf.iter().sum()).collect();

    // Sort biggest to smallest
    elves.sort_by(|a, b| b.cmp(a));

    println!("Top elf has {} calories", elves[0]);
    println!(
        "Top 3 elves have {} calories",
        elves[0] + elves[1] + elves[2]
    );
}

fn elves(datafile: &String) -> Vec<Vec<i32>> {
    let file = fs::File::open(datafile).expect("No such file");
    let buf = io::BufReader::new(file);
    let lines: Vec<String> = buf.lines().map(|l| l.unwrap()).collect();

    // Make the list of elves and the first elf
    let mut elves = Vec::new();
    let mut elf = Vec::new();

    for line in lines {
        if line.is_empty() {
            elves.push(elf);
            elf = Vec::new();
        } else {
            let calories = line.parse::<i32>().unwrap();
            elf.push(calories);
        }
    }
    if elf.len() > 0 {
        elves.push(elf);
    }

    elves
}
