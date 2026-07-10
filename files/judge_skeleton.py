# Mini-Judge skeleton -- Day 2
#
# Fill in the TODOs to build your first working judge. Change which function
# `judge(...)` is called with at the bottom to grade a different candidate.

def is_leap_correct(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def is_leap_buggy_1(year):
    return year % 4 == 0 and (year % 100 == 0 or year % 400 == 0)

def is_leap_buggy_2(year):
    return year % 4 == 0 and (year % 400 != 0 or year % 100 == 0)

def is_leap_buggy_3(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 40 == 0)

def judge(candidate, test_cases):
    passed = 0
    for year, expected in test_cases:
        actual = candidate(year)
        if actual == expected:
            # TODO: print a line showing this test PASSED (include the year)
            passed += 1
        else:
            # TODO: print a line showing this test FAILED
            # (include the year, the expected answer, and the actual answer)
            pass
    # TODO: print a summary like "3/4 tests passed"

# Step 1: your test cases as (year, expected) pairs.
# Add more! What about year 0? A negative year? 1900 vs 2000?
test_cases = [
    (2000, True),
    (1900, False),
    (2024, True),
    (2023, False),
]

# Step 2: which function are we grading right now?
judge(is_leap_buggy_1, test_cases)
