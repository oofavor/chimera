import { validateCreateUserBody } from '../utils/validate';

describe('User', () => {
  test('should validate when register', () => {
    const name = 'testify';
    const password = 'AbC1235AqwV';

    const wrongName = 'a';
    const wrongPassword = '12345A678';

    const missingData = validateCreateUserBody(undefined);
    const noName = validateCreateUserBody({ password });
    const noPassword = validateCreateUserBody({ name });

    const notValidName = validateCreateUserBody({
      name: wrongName,
      password,
    });
    const notValidPassword = validateCreateUserBody({
      name,
      password: wrongPassword,
    });
    const err = expect.objectContaining({ isError: true });
    const valid = validateCreateUserBody({ name, password });

    expect(missingData).toEqual(err);
    expect(noName).toEqual(err);
    expect(noPassword).toEqual(err);

    expect(notValidName).toEqual(err);
    expect(notValidPassword).toEqual(err);

    expect(valid).toEqual({ name, password });
  });
});
