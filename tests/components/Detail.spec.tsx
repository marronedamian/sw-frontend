import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Detail from '@/components/category/Detail';

jest.mock('@/utils/resource.utils', () => ({
    parseSwapiUrl: (url: string) =>
        url.includes('swapi.dev')
            ? { href: '/people/1', label: 'Luke Skywalker' }
            : null,
}));

describe('Detail', () => {
    it('muestra un valor string', () => {
        render(<Detail label="Nombre" value="Luke Skywalker" />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('muestra enlaces para un array de URLs parseadas', () => {
        render(<Detail label="Personajes" value={['https://swapi.dev/api/people/1/']} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/people/1');
        expect(link).toHaveTextContent('Luke Skywalker');
    });

    it('muestra texto plano si no se puede parsear la URL', () => {
        render(<Detail label="Otro" value={['invalid-url']} />);
        expect(screen.getByText('invalid-url')).toBeInTheDocument();
    });
});
