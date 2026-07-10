fn letter_grade_buggy_3(score: i32) -> char {
    if score >= 90 {
        'A'
    } else if score >= 80 {
        'B'
    } else if score >= 70 {
        'C'
    } else if score >= 65 {
        'D'
    } else {
        'F'
    }
}

fn main() {
    let score = 50;
    println!("{}", letter_grade_buggy_3(score));
}
