const validateInput = (n) => {
    if (!Number.isInteger(n) || !Number.isSafeInteger(n)) {
        throw new Error(`Input must be a safe integer. Received: ${n}`);
    }
};

const sum_to_n_a = (n) => {
    validateInput(n);
    if (n < 1) return 0;
    return (n * (n + 1)) / 2;
};

const sum_to_n_b = (n) => {
    validateInput(n);
    if (n < 1) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

const sum_to_n_c = (n) => {
    validateInput(n);
    if (n < 1) return 0;
    return Array.from({ length: n }, (_, i) => i + 1)
        .reduce((acc, curr) => acc + curr, 0);
};

module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
