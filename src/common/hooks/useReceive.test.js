import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';

import { useOkapiKy } from '@folio/stripes/core';

import {
  useReceive,
} from './useReceive';

const queryClient = new QueryClient();
const pieceValues = {
  id: 'pieceId',
  holdingId: 'holdingId',
  caption: 'v1',
};

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useReceive', () => {
  it('should make post request to receive pieces', async () => {
    const postMock = jest.fn().mockReturnValue(Promise.resolve({ json: () => ({ receivingResults: [] }) }));

    useOkapiKy.mockClear().mockReturnValue({
      post: postMock,
    });

    const { result } = renderHook(
      () => useReceive(),
      { wrapper },
    );

    await result.current.receive([pieceValues]);

    expect(postMock).toHaveBeenCalled();
  });
});
