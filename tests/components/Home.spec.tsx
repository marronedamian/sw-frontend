import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
    it('muestra el título principal', () => {
        render(<Home />);
        expect(screen.getByText('STAR WARS API EXPLORER')).toBeInTheDocument();
    });

    it('muestra el botón de comenzar', () => {
        render(<Home />);
        const link = screen.getByRole('link', { name: /comenzar la aventura/i });
        expect(link).toBeInTheDocument();
    });
});
