import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import React, { ReactElement } from 'react';

import Card from './explore';

const DUMMY_DATA = {
  name: 'Dark Magician',
  card_images:
    'https://storage.googleapis.com/ygoprodeck.com/pics/46986421.jpg',
};

jest.mock("next/link", () => {
  return ({children}) => {
      return children;
  }
});

describe('Card', () => {
  beforeEach(async () => {
    render(<Card id={DUMMY_DATA.name} imageSrc={DUMMY_DATA.card_images} />);
    jest.mock(
      'next/link',
      () =>
        ({ children }: any) =>
          children
    )
  });

  it('should see image', () => {
    expect(screen.findByLabelText(DUMMY_DATA.name)).toBeTruthy();
  });

  it('should see link', async () => {
    const link = screen.getByLabelText('detail ' + DUMMY_DATA.name);
    expect(link).toBeTruthy();
  });

  it('should be able to add card to deck', async () => {
    const btn = await screen.findByTestId('add-deck');
    fireEvent.click(btn);

    waitFor(() => {
      const storage = JSON.parse(localStorage.getItem('deck'));
      expect(storage).toContainEqual({
        id: DUMMY_DATA.name,
        imageSrc: DUMMY_DATA.card_images,
      });
    });
  });

  it("should be able remove card from deck if already there",async()=>{
    const btn = await screen.findByTestId('add-deck');
    fireEvent.click(btn);
    fireEvent.click(btn);

    waitFor(() => {
      const storage = JSON.parse(localStorage.getItem('deck'));
      expect(storage).not.toContainEqual({
        id: DUMMY_DATA.name,
        imageSrc: DUMMY_DATA.card_images,
      });
    });
  })
});
