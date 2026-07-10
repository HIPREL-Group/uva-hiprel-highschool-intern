def is_leap_buggy_2(year):
    return year % 4 == 0 and (year % 400 != 0 or year % 100 == 0)


if __name__ == "__main__":
    year = 2021
    print(is_leap_buggy_2(year))
