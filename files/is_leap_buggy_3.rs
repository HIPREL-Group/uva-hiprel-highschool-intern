fn is_leap_buggy_3(year: i32) -> bool {
    year % 4 == 0 && (year % 100 != 0 || year % 40 == 0)
}

fn main() {
    let year = 2021;
    println!("{}", is_leap_buggy_3(year));
}
