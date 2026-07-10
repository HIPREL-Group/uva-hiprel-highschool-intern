fn is_leap_buggy_4(year: i32) -> bool {
    (year + 1) % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}

fn main() {
    let year = 2021;
    println!("{}", is_leap_buggy_4(year));
}
