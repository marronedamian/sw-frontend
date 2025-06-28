import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FavoriteButton from '@/components/favorites/FavoriteButton';

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { id: 'user123' },
    },
    status: 'authenticated',
  }),
}));

jest.mock('@/services/favorite.service', () => ({
  getFavorites: jest.fn(() => Promise.resolve([])),
  addFavorite: jest.fn(() => Promise.resolve({ id: 'fav123' })),
  deleteFavorite: jest.fn(() => Promise.resolve()),
}));

describe('FavoriteButton', () => {
  it('renderiza correctamente', async () => {
    render(<FavoriteButton resourceType="people" resourceId={1} />);
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('☆');
  });

  it('llama a addFavorite al hacer clic si no es favorito', async () => {
    const { addFavorite } = await import('@/services/favorite.service');

    render(<FavoriteButton resourceType="people" resourceId={1} />);
    const button = await screen.findByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(addFavorite).toHaveBeenCalledWith('user123', 'people', 1);
    });
  });
});
