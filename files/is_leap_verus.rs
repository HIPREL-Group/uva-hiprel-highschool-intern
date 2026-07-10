// Day 3 Verus skeleton. Paste this into https://play.verus-lang.org/
//
// Fill in `is_leap_spec` to match your own written specification (or, once
// you're ready, compare it against the version you already know works from
// the Learn section of Day 3). Then confirm `is_leap` verifies.

use vstd::prelude::*;

verus! {

spec fn is_leap_spec(year: int) -> bool {
    // TODO: write your spec here, e.g.:
    // year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    true
}

fn is_leap(year: i32) -> (result: bool)
    ensures
        result == is_leap_spec(year as int),
{
    // TODO: this body must actually match is_leap_spec above, or Verus
    // will report "postcondition not satisfied"
    year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}

fn main() {}

} // verus!
