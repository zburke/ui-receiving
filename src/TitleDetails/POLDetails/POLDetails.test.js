import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import '@folio/stripes-acq-components/test/jest/__mock__';

import POLDetails from './POLDetails';

const renderPOLDetails = ({
  accessProvider,
  expectedReceiptDate,
  materialSupplier,
  orderFormat,
  orderType,
  poLineId,
  poLineNumber,
  receivingNote,
  requester,
  rush,
  vendor,
}) => (render(
  <IntlProvider locale="en">
    <MemoryRouter>
      <POLDetails
        accessProvider={accessProvider}
        expectedReceiptDate={expectedReceiptDate}
        materialSupplier={materialSupplier}
        orderFormat={orderFormat}
        orderType={orderType}
        poLineId={poLineId}
        poLineNumber={poLineNumber}
        receivingNote={receivingNote}
        requester={requester}
        rush={rush}
        vendor={vendor}
      />
    </MemoryRouter>
  </IntlProvider>,
));

const polDetails = {
  accessProvider: 'Access provider',
  materialSupplier: 'Material supplier',
  orderFormat: 'P/E Mix',
  orderType: 'Ongoing',
  poLineId: '001',
  poLineNumber: 'POL-001',
  expectedReceiptDate: '2021-02-06',
  receivingNote: 'critical',
  requester: 'Requester',
  rush: true,
  vendor: 'Vendor',
};

describe('Given POL details', () => {
  afterEach(cleanup);

  it('Than it should display PO Line values', () => {
    const { getByText } = renderPOLDetails(polDetails);

    expect(getByText(polDetails.poLineNumber)).toBeDefined();
    expect(getByText(polDetails.expectedReceiptDate)).toBeDefined();
    expect(getByText(polDetails.receivingNote)).toBeDefined();
    expect(getByText(polDetails.accessProvider)).toBeDefined();
    expect(getByText(polDetails.materialSupplier)).toBeDefined();
    expect(getByText('ui-receiving.title.orderType.Ongoing')).toBeDefined();
    expect(getByText(polDetails.vendor)).toBeDefined();
    expect(getByText(polDetails.requester)).toBeDefined();
  });

  describe('When title is connected with poLine', () => {
    it('Than it should display POL number as a link', () => {
      const { queryByTestId } = renderPOLDetails(polDetails);

      expect(queryByTestId('titlePOLineLink')).not.toEqual(null);
    });
  });
});
