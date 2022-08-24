import formatAddress from '../formateAddress';

describe('formatAddress', () => {
  it('returns the formatted address', () => {
    const addressObject = {
      street1: '123 Main Street',
      street2: '',
      city: 'Atlanta',
      state: 'GA',
      zip: '30307',
    };




    const result = formatAddress(addressObject);
    const expected = '123 Main Street\nApartment 456\nAtlanta, GA 30307';

    expect(result).toEqual(expected);
  });


  it('retuns the formated address without street2', () => {
    const addressObject = {
        street1: '123 Main Street',
        city: 'Atlanta',
        state: 'GA',
        zip: '30307',
      };

      const result = formatAddress(addressObject);
    const expected = '123 Main Street\nAtlanta, GA 30307';

    expect(result).toEqual(expected);
  })


});