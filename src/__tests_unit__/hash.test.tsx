import { describe, it, expect } from 'vitest';
import { generateHash } from '../utils/hash';
import '@testing-library/jest-dom';

// Verificação de geração de Hash
describe('generateHash', () => {
  it('should generate an MD5 hash', () => {
    const ts = '1234567890';
    const privateKey = 'privateKey';
    const publicKey = 'publicKey';
    
    const hash = generateHash(ts, privateKey, publicKey);
    
    // Verifica se o hash gerado é uma string com 32 caracteres hexadecimais
    expect(hash).toMatch(/^[a-f0-9]{32}$/);
  });
});
