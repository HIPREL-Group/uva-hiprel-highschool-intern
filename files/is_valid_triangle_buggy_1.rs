fn is_valid_triangle_buggy_1(a: i32, b: i32, c: i32) -> bool {
    a > 0 && b > 0 && c > 0 && a + b > a && b + c > a && a + c > b
}

fn main() {
    let (a, b, c) = (3, 4, 5);
    println!("{}", is_valid_triangle_buggy_1(a, b, c));
}
