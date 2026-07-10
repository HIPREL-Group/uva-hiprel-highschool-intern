# Problem: Password Validator (E1 Extension)

Write a Rust function `fn is_valid_password(password: &str) -> bool` that returns
`true` if a password follows these rules, and `false` otherwise:

- At least 8 characters long
- Contains at least one digit (0-9)
- Contains at least one uppercase letter (A-Z)

This description sounds simple, but (like leap years) it hides ambiguity. Before
you start testing, discuss:

- What about non-English letters, or symbols like `!` and `@` — required, allowed, ignored?
- What's the correct answer for an empty string?
- Does "at least 8 characters" count spaces?

Write your own precise spec for this before you start hunting for bugs in the
provided buggy versions.
