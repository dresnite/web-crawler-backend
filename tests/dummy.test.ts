const numero: number = 100;

test("Should verify that a number is 100", async() => {
    expect(numero).toBe(100);
});

test("Should verify that the DEVELOPMENT environment is set to 1", async () => {
    expect(process.env.DEVELOPMENT).toBeTruthy();
});