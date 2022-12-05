def part1(lines)
  result = 0
  lines.each do |line|
    if includes(line[0], line[1]) || includes(line[1], line[0])
      result += 1
    end
  end
  puts "Part 1: #{result}"
end

def includes(outside, inside)
  outside[0] <= inside[0] && outside[1] >= inside[1]
end

def part2(lines)
  result = 0
  lines.each do |line|
    if overlap(line)
      result += 1
    end
  end
  puts "Part 2: #{result}"
end

def overlap(line)
  between(line[0][1], line[1][0], line[1][1]) ||
    between(line[1][1], line[0][0], line[0][1])
end

def between(a, left, right)
  a >= left && a <= right
end

filename = ARGV[0]
lines = File.readlines(filename)
lines = lines
  .map{|line| line.split(',')}
  .map{|side| side.map{|part| part.split('-').map(&:to_i)}}

part1(lines)
part2(lines)
