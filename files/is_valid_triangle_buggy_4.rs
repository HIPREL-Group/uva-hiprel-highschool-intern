fn is_valid_triangle_buggy_4(a: i32, b: i32, c: i32) -> bool {
    a > 0 && b > 0 && c > 0 && (a + b > c || b + c > a || a + c > b)
}

fn main() {
    let (a, b, c) = (3, 4, 5);
    println!("{}", is_valid_triangle_buggy_4(a, b, c));
}
