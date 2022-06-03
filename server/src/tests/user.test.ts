import { validateCreateUserBody } from '../utils/validate';

describe('User', () => {
  test('should validate when register', () => {
    const name = 'testify';
    const password = 'AbC1235AqwV';
    const email = 'examble@gmail.com';

    const wrongName = 'a';
    const wrongPassword = '12345A678';
    const wrongEmail = 'a';

    const missingData = validateCreateUserBody(undefined);
    const noName = validateCreateUserBody({ email, password });
    const noEmail = validateCreateUserBody({ name, password });
    const noPassword = validateCreateUserBody({ name, email });

    const notValidName = validateCreateUserBody({
      name: wrongName,
      email,
      password,
    });
    const notValidEmail = validateCreateUserBody({
      name,
      email: wrongEmail,
      password,
    });
    const notValidPassword = validateCreateUserBody({
      name,
      email,
      password: wrongPassword,
    });
    const err = expect.objectContaining({ isError: true });
    const valid = validateCreateUserBody({ name, email, password });
    
    expect(missingData).toEqual(err);
    expect(noName).toEqual(err);
    expect(noEmail).toEqual(err);
    expect(noPassword).toEqual(err);

    expect(notValidName).toEqual(err);
    expect(notValidEmail).toEqual(err);
    expect(notValidPassword).toEqual(err);

    expect(valid).toEqual({ name, email, password });
  });
});
