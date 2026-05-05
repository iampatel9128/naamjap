import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DevotionalImage } from '../src/components/DevotionalImage';

describe('DevotionalImage', () => {
  /**
   * Validates: Requirements 2.1
   */
  it('renders with correct accessibility label', () => {
    render(<DevotionalImage />);
    expect(screen.getByLabelText('Lord Radha and Krishna')).toBeTruthy();
  });
});
