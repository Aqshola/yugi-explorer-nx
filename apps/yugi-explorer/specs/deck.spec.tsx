import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Index from '../pages/deck/index';
import { act } from 'react-dom/test-utils';

const DUMMY_DATA = {
  id: 'Dark Magician',
  imageSrc: 'https://storage.googleapis.com/ygoprodeck.com/pics/46986421.jpg',
};
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));
describe('Deck', () => {
  beforeEach(() => {
    localStorage.setItem('deck', JSON.stringify([DUMMY_DATA]));
    act(() => {
      render(<Index />);
    });
  });

  it('should render page properly', async () => {
    const findText = await screen.findByText('Yugi Explorer');
    expect(findText).toBeTruthy();
  });

  it('should render card based on localstorage', () => {
    waitFor(() => {
      setTimeout(async () => {
        const findCard = await screen.findAllByTestId('img-card');
        expect(findCard.length).toBe(1);
      }, 60000);
    });
  });

  it("should be able to filter card based on input",async ()=>{
    const input=await screen.findAllByLabelText("Search Card")
    fireEvent.change(input[0],{target:{value:"None"}})

    setTimeout(async () => {
      const findCard = await screen.findAllByTestId('img-card');
        expect(findCard.length).toBe(0)
    }, 60000);
  })
});
