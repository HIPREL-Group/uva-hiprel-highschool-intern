fn is_prime(n: i32) -> bool {
    if n < 2 {
        return false;
    }
    let mut i = 2;
    while i * i <= n {
        if n % i == 0 {
            return false;
        }
        i += 1;
    }
    true
}

fn main() {
    for n in [-5, 0, 1, 2, 3, 4, 17, 20, 97] {
        println!("{} -> {}", n, is_prime(n));
    }
}
