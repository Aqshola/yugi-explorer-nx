import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FilterMobile from './mobile';

describe('FilterMobile', () => {
  beforeEach(()=>{
    render(<FilterMobile inputValue='' onChangeCallback={()=>{}} />);
  })
  it("Should see button for expand filter",()=>{
    const btn=screen.getByLabelText ("Filter")
    expect(btn).toBeTruthy()
  })

  it('Should be able to expand filter',async()=>{
    const btn=screen.getByLabelText ("Filter")
    fireEvent.click(btn)

    const boxSearch=await screen.findByTestId("box-search")
    expect(boxSearch.classList.contains('visible')).toBeTruthy()
  })

  it('Should be able to close filter',async()=>{
    const btn=screen.getByLabelText ("Filter")
    fireEvent.click(btn)
    fireEvent.click(btn)

    const boxSearch=await screen.findByTestId("box-search")
    expect(boxSearch.classList.contains('visible')).toBeFalsy()
  })

  it('Should have same value as input',async ()=>{
    const input=screen.getByLabelText("Search Card")

    fireEvent.change(input,{target:{value:"lalatina"}})

    waitFor(()=>{
      expect(screen.getByDisplayValue("lalatina")).toHaveAttribute('id',"search");
    })
  })
});
