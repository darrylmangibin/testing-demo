const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
	it('should return the greeting message', () => {
		const result = lib.greet('LD');

		expect(result).toMatch(/LD/);
		expect(result).toContain('LD');
	});
});

describe('getCurrencies', () => {
	it('should return supported currencies', () => {
		const result = lib.getCurrencies();

		// Too general
		expect(result).toBeDefined();
		expect(result).not.toBeNull();

		// Too specific
		expect(result[0]).toBe('USD');
		expect(result[1]).toBe('AUD');
		expect(result[2]).toBe('EUR');
		expect(result.length).toBe(3);

		// Proper way
		expect(result).toContain('USD');
		expect(result).toContain('AUD');
		expect(result).toContain('EUR');

		// Ideal way
		expect(result).toEqual(expect.arrayContaining(['AUD', 'EUR', 'USD']));
	});
});

describe('getProduct', () => {
	it('should return the product with the given id', () => {
		const result = lib.getProduct(1);

		expect(result).toEqual({ id: 1, price: 10 });
		expect(result).toMatchObject({ id: 1, price: 10 });
		expect(result).toHaveProperty('id', 1);
	});
});

describe('registerUser', () => {
	it('should throw if username is falsy', () => {
		const args = [null, undefined, NaN, '', 0, false];
		args.forEach((a) => {
			expect(() => {
				lib.registerUser(a);
			}).toThrow();
		});
	});

	it('should return a user object if valid username is passed', () => {
		const result = lib.registerUser('LD');

		expect(result).toMatchObject({ username: 'LD' });
		expect(result).toHaveProperty('id', result.id, 'username', 'LD');
	});
});

describe('applyDiscount', () => {
	it('should apply 10% discount if customer has more than 10 points', () => {
		db.getCustomerSync = (customerId) => {
			console.log('Fake reading customer MongoDB...');
			return { id: customerId, points: 20 };
		};

		const order = { customerId: 1, totalPrice: 10 };

		lib.applyDiscount(order);

		expect(order.totalPrice).toBe(9);
	});
});

describe('notifyCustomer', () => {
	it('should send an email to the customer', () => {
		// const mockFunction = jest.fn();
		// mockFunction.mockReturnValue(1)
		// mockFunction.mockResolvedValue(1)
		// mockFunction.mockRejectedValue(1);
		db.getCustomerSync = jest.fn().mockReturnValue({ email: 'ld@gmail.com' });
		mail.send = jest.fn();

		lib.notifyCustomer({ customerId: 1 });

		expect(mail.send).toHaveBeenCalled();
		expect(mail.send).toHaveBeenCalledWith(
			'ld@gmail.com',
			'Your order was placed successfully.'
    );
    expect(mail.send.mock.calls[0][0]).toBe('ld@gmail.com')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
	});
});
