// Mini-Judge skeleton -- Day 2
//
// Fill in the TODOs to build your first working judge. Change which function
// `judge(...)` is called with in `main` to grade a different candidate.

fn is_leap_correct(year: i32) -> bool {
    year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}

fn is_leap_buggy_1(year: i32) -> bool {
    year % 4 == 0 && (year % 100 == 0 || year % 400 == 0)
}

fn is_leap_buggy_2(year: i32) -> bool {
    year % 4 == 0 && (year % 400 != 0 || year % 100 == 0)
}

fn is_leap_buggy_3(year: i32) -> bool {
    year % 4 == 0 && (year % 100 != 0 || year % 40 == 0)
}

fn judge(candidate: fn(i32) -> bool, test_cases: &[(i32, bool)]) {
    let mut passed = 0;
    for &(year, expected) in test_cases {
        let actual = candidate(year);
        if actual == expected {
            // TODO: print a line showing this test PASSED (include the year)
            passed += 1;
        } else {
            // TODO: print a line showing this test FAILED
            // (include the year, the expected answer, and the actual answer)
        }
    }
    // TODO: print a summary like "3/4 tests passed"
}

fn main() {
    // Step 1: your test cases as (year, expected) pairs.
    // Add more! What about year 0? A negative year? 1900 vs 2000?
    let test_cases = [
        (2000, true),
        (1900, false),
        (2024, true),
        (2023, false),
    ];

    // Step 2: which function are we grading right now?
    judge(is_leap_buggy_1, &test_cases);
}
