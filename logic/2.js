function createTriangle(x) {
    for (let i = 1; i <= x; i++) {
        console.log(' '.repeat(x - i) + '#'.repeat(i));
    }
}

createTriangle(10);
