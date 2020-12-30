const lib = require('../exercise1');

describe('fizzBuzz', () => {
	it('should throw an exection if input is not a number', () => {
		expect(() => lib.fizzBuzz('a')).toThrow();
		expect(() => lib.fizzBuzz(null)).toThrow();
		expect(() => lib.fizzBuzz(undefined)).toThrow();
		expect(() => lib.fizzBuzz({})).toThrow();
	});

	it('should return FizzBuzz if input is divisible by 3 and 5', () => {
		const result = lib.fizzBuzz(15);

		expect(result).toBe('FizzBuzz');
	});

	it('should return Fizz if input is divisible by 3 and not 5', () => {
		const result = lib.fizzBuzz(6);

		expect(result).toBe('Fizz');
	});

	it('should return Buzz if input is divisible by 5 and not 3', () => {
		const result = lib.fizzBuzz(10);

		expect(result).toBe('Buzz');
	});

	it('should return input if it is not divisible by 3 or 5', () => {
		const result = lib.fizzBuzz(4);

		expect(result).toBe(4);
	});
});
