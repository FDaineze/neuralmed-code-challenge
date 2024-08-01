import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingScreen from '../components/LoadingScreen';

describe('LoadingScreen Component', () => {
  it('renders the loading screen', () => {
    render(<LoadingScreen />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
