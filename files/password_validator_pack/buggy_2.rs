fn is_valid_password(password: &str) -> bool {
    // Bug: forgets to require an uppercase letter
    if password.len() < 8 {
        return false;
    }
    let has_digit = password.chars().any(|c| c.is_ascii_digit());
    has_digit
}

fn main() {
    println!("{}", is_valid_password("password1"));
}
