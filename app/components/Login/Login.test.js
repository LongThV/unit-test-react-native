import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import LoginScreen, {callApiLogin} from './LoginScreen';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        code: 200,
        message: 'ログインしました。',
        access_token: '17262|7wvg41a6mSiuxqrvJ9Vg6nL8rUmtnkG57IwnGmZI',
        role: 4,
      }),
  }),
);

beforeEach(() => {
  fetch.mockClear();
});

describe('check validation', () => {
  it('Login success', async () => {
    const login = render(<LoginScreen />);
    const inputEmail = login.getByTestId('Email');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputEmail, '');
    fireEvent.press(submitButton);

    const response = await callApiLogin('long@gmail.com', '123456');

    await waitFor(() => {
      expect(response?.code).toBe(200);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('Email can not be blank', async () => {
    const login = render(<LoginScreen />);
    const inputEmail = login.getByTestId('Email');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputEmail, '');
    fireEvent.press(submitButton);

    screen.getByText('Email cannot be blank');
  });

  it('Check invalid email', () => {
    const login = render(<LoginScreen />);
    const inputEmail = login.getByTestId('Email');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputEmail, 'adsf');
    fireEvent.press(submitButton);

    screen.getByText('Invalid email format');
  });

  it('Password can not be blank', () => {
    const login = render(<LoginScreen />);
    const inputPassword = login.getByTestId('Password');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputPassword, '');
    fireEvent.press(submitButton);

    screen.getByText('Password cannot be blank');
  });

  it('Password must be more than 4 characters', () => {
    const login = render(<LoginScreen />);
    const inputPassword = login.getByTestId('Password');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputPassword, 'aa');
    fireEvent.press(submitButton);

    screen.getByText('Password must be more than 4 characters');
  });

  it('Forspanm Success', () => {
    const login = render(<LoginScreen />);
    const inputEmail = login.getByTestId('Email');
    const inputPassword = login.getByTestId('Password');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputPassword, 'aa');
    fireEvent.changeText(inputEmail, 'a@a.com');
    fireEvent.changeText(inputPassword, '1234');
    fireEvent.press(submitButton);

    screen.getByText('Form submitted successfully');
  });

  it('Error messages should be removed if form is valid', () => {
    const login = render(<LoginScreen />);
    const inputEmail = login.getByTestId('Email');
    const inputPassword = login.getByTestId('Password');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputEmail, 'a');
    fireEvent.changeText(inputPassword, '1');
    fireEvent.press(submitButton);

    fireEvent.changeText(inputEmail, 'a@a.com');
    fireEvent.changeText(inputPassword, '1234');

    fireEvent.press(submitButton);

    screen.getByText('Form submitted successfully');

    const emailError1 = screen.queryByText('Email cannot be blank');
    const emailError2 = screen.queryByText('Invalid email format');
    const passwordError1 = screen.queryByText('Password cannot be blank');
    const passwordError2 = screen.queryByText(
      'Password must be more than 4 characters',
    );
    expect(emailError1).toBeNull();
    expect(emailError2).toBeNull();
    expect(passwordError1).toBeNull();
    expect(passwordError2).toBeNull();
  });

  describe('check crash', () => {
    it('should not crash when rendered', () => {
      render(<LoginScreen />);
      expect(screen.queryByTestId('login-screen')).toBeTruthy();
    });
  });
});
