import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Custom404 from '../pages/404';
import '@testing-library/jest-dom';

// Verificação de geração do codigo de erro 404 e especificação
describe('Custom404', () => {
  it('should render the 404 message', () => {
    render(<Custom404 />);
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
