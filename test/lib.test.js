const lib = require('../lib');

describe('absoute', () => {
	it('should return a positive number if input is positive', () => {
		const result = lib.absolute(1);

		expect(result).toBe(1);
	});

	it('should return a positive number if input is negative', () => {
		const result = lib.absolute(-1);

		expect(result).toBe(1);
	});

	it('should return a 0 number if input is 0', () => {
		const result = lib.absolute(0);

		expect(result).toBe(0);
	});
});

describe('greet', () => {
	it('shoult return the greeting message', () => {
		const result = lib.greet('LD');

		expect(result).toMatch(/LD/);
		expect(result).toContain('LD');
	});
});
