import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';
import { describe, it, expect } from 'vitest';

// Verificação de geração de logo no header
describe('Header Component', () => {
    it('renders header correctly', () => {
        const { getByAltText } = render(<Header />);
        expect(getByAltText('Logo')).toBeInTheDocument();
    });
});
