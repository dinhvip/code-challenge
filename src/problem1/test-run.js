const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./index');

const tests = [
    { input: 5, expected: 15, desc: "Normal case (n=5)" },
    { input: 1, expected: 1, desc: "Lower bound (n=1)" },
    { input: 0, expected: 0, desc: "Zero input (n=0)" },
    { input: -10, expected: 0, desc: "Negative input (n=-10)" },
    { input: 100, expected: 5050, desc: "Larger number (n=100)" },
];

let failed = false;

tests.forEach(({ input, expected, desc }) => {
    try {
        const resA = sum_to_n_a(input);
        const resB = sum_to_n_b(input);
        const resC = sum_to_n_c(input);

        if (resA === expected && resB === expected && resC === expected) {
            console.log(`[PASS] ${desc}`);
        } else {
            console.error(`[FAIL] ${desc} | Expected: ${expected} | Got: A=${resA}, B=${resB}, C=${resC}`);
            failed = true;
        }
    } catch (e) {
        console.error(`[FAIL] ${desc} | Threw error: ${e.message}`);
        failed = true;
    }
});

