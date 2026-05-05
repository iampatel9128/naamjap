import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';

jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) => React.createElement('svg', props, children),
    Circle: (props: any) => React.createElement('circle', props),
  };
});

describe('HomeScreen', () => {
  /**
   * Validates: Requirements 1.1, 1.2, 3.3, 4.1
   */
  it('renders DevotionalImage and CircularCounter', () => {
    render(<HomeScreen />);
    expect(screen.getByLabelText('Lord Radha and Krishna')).toBeTruthy();
    expect(screen.getByLabelText(/Counter:.*Tap to increment/)).toBeTruthy();
  });

  /**
   * Validates: Requirements 3.3, 1.2
   */
  it('displays initial count of 0/108', () => {
    render(<HomeScreen />);
    expect(screen.getByText('0/108')).toBeTruthy();
  });

  /**
   * Validates: Requirements 4.1, 4.2
   */
  it('increments count when counter is tapped', () => {
    render(<HomeScreen />);
    const counter = screen.getByLabelText(/Counter:.*Tap to increment/);
    fireEvent.press(counter);
    expect(screen.getByText('1/108')).toBeTruthy();
  });
});
