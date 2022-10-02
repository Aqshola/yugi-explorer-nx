import { render, waitFor } from '@testing-library/react';

import Head from './head';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('Head', () => {
  it('Should render the default title', async () => {
    render(<Head />, {
      container: document.head,
    });
    await waitFor(() => {
      expect(document.title).toEqual('Welcome to Yugi Explorer');
    });
  });

  it('Should have dynamic title', async () => {
    render(<Head title="Lalatina" />, {
      container: document.head,
    });

    await waitFor(() => {
      expect(document.title).toEqual('Lalatina');
    });
  });
});
