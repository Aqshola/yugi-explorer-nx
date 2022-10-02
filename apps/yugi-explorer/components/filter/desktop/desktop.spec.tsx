import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FilterDesktop from './desktop';

describe('FilterDesktop', () => {

  beforeEach(()=>{
    render(<FilterDesktop inputValue='' type='main' onChangeCallback={()=>{}}/>);
  })
  it('should render successfully', async () => {
    const input= await screen.findByLabelText("Search Card")
    expect(input).toBeTruthy()

  });

  it("input element have same value as state",async ()=>{
    const input= await screen.findByLabelText("Search Card")
    fireEvent.change(input,{target:{
      value:"lalatina"
    }})


    waitFor(()=>{
      expect(screen.getByDisplayValue('lalatina')).toHaveAttribute("id","search");
    })
  })
});
