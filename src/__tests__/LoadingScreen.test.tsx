import React from 'react';
import { render } from '@testing-library/react';
import LoadingScreen from '../components/LoadingScreen';
import { describe, it, expect } from 'vitest';

// Verificação de geração do elemento Loading (se não está em branco)
describe('LoadingScreen Component', () => {
    it('renders loading screen correctly', () => {
        const { container } = render(<LoadingScreen />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
