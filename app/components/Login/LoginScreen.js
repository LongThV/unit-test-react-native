import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export const Login = () => {
  const [formData, setFormData] = useState({
    values: {
      email: '',
      password: '',
    },
    errors: {
      email: '',
      password: '',
    },
    isValid: false,
    isSubmittted: false,
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [name]: value,
      },
    });
  };

  const handleSubmit = event => {
    const errors = validation();
    const isValid = !errors.email && !errors.password ? true : false;
    setFormData({
      ...formData,
      errors: {
        email: errors.email,
        password: errors.password,
      },
      isValid: isValid,
    });
    if (isValid) {
      setFormData({
        ...formData,
        isSubmittted: true,
        errors: {
          email: '',
          password: '',
        },
      });
    }
  };

  const validation = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {
      email: '',
      password: '',
    };

    if (!formData.values.email) {
      errors.email = 'Email cannot be blank';
    } else if (!regex.test(formData.values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.values.password) {
      errors.password = 'Password cannot be blank';
    } else if (formData.values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    }
    return errors;
  };

  return (
    <View
      testID="login-screen"
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Sign in to continue
        </Text>
        {formData.isSubmittted && (
          <Text style={{color: 'green', marginTop: 10}}>
            Form submitted successfully
          </Text>
        )}
        <Text style={{marginTop: 30}}>Email</Text>
        <TextInput
          onChangeText={text => handleChange('email', text)}
          style={{
            width: 320,
            height: 35,
            backgroundColor: 'white',
          }}
          testID="Email"
        />
        {formData.errors.email && (
          <Text style={{color: 'red'}}>{formData.errors.email}</Text>
        )}
        <Text>Password</Text>
        <TextInput
          onChangeText={text => handleChange('password', text)}
          style={{
            width: 320,
            height: 35,
            backgroundColor: 'white',
          }}
          testID="Password"
        />
        {formData.errors.password && (
          <Text style={{color: 'red'}}>{formData.errors.password}</Text>
        )}
      </View>
      <Button
        title="Login"
        onPress={handleSubmit}
        testID="submit-button"></Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
