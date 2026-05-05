import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CircularCounter } from '../src/components/CircularCounter';

jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) => React.createElement('svg', props, children),
    Circle: (props: any) => React.createElement('circle', props),
  };
});

describe('CircularCounter', () => {
  const defaultProps = {
    displayText: '5/108',
    progress: 5 / 108,
    onTap: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Validates: Requirements 3.1, 3.2
   */
  it('renders displayText correctly', () => {
    render(<CircularCounter {...defaultProps} />);
    expect(screen.getByText('5/108')).toBeTruthy();
  });

  /**
   * Validates: Requirements 4.1
   */
  it('calls onTap when pressed', () => {
    render(<CircularCounter {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.press(button);
    expect(defaultProps.onTap).toHaveBeenCalledTimes(1);
  });

  /**
   * Validates: Requirements 3.1
   */
  it('has an accessibility label', () => {
    render(<CircularCounter {...defaultProps} />);
    expect(
      screen.getByLabelText('Counter: 5/108. Tap to increment.')
    ).toBeTruthy();
  });
});
