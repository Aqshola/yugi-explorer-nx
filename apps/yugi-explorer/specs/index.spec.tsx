import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Index from '../pages/index';
import { act } from 'react-dom/test-utils';

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

jest.mock("next/link", () => {
  return ({children}) => {
      return children;
  }
});

describe('Index', () => {
  beforeEach(() => {
    act(()=>{
      render(<Index />);
    })
  });

  it('should render page properly', async () => {
    const findText = await screen.findByText('Yugi Explorer');
    expect(findText).toBeTruthy();
  });

  it('should have 15 card as initial data',() => {

    waitFor(()=>{
      setTimeout(async () => {
        const findCard = await screen.findAllByTestId('img-card');
        expect(findCard.length).toBe(15)
      }, 60000);

    })
  });

  it("should be able to filter card based on input",async ()=>{
    const input=await screen.findAllByLabelText("Search Card")
    fireEvent.change(input[0],{target:{value:"Dark Magician"}})

    setTimeout(async () => {
      const findCard = await screen.findAllByTestId('img-card');
        expect(findCard.length).toBe(10)
    }, 60000);
  })

  it("Should be able to see deck link", async ()=>{
    const decklink=await screen.findAllByText("My Deck")
    expect(decklink).toHaveLength(2)//There link for mobile and desktop
  })

  it("Should be able to open deck page",async ()=>{
    const decklink=await screen.findAllByText("My Deck")
    fireEvent.click(decklink[0])

    waitFor(()=>{
      expect(document.location.pathname).toEqual("/deck")
    })

  })

});
