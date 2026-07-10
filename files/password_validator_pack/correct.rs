fn is_valid_password(password: &str) -> bool {
    if password.len() < 8 {
        return false;
    }
    let has_digit = password.chars().any(|c| c.is_ascii_digit());
    let has_upper = password.chars().any(|c| c.is_ascii_uppercase());
    has_digit && has_upper
}

fn main() {
    println!("{}", is_valid_password("Passwrd1"));
}
