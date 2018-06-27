
import { deDuplicate, compare } from './deDuplicate';

describe('deDuplicate tests', () => {
  //record1 and record2 have same email
  const record1 = {
    _id: 'jkj238238jdsnfsj23',
    email: 'foo@bar.com',
    firstName:  'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:30:20+00:00'
  };

  const record2 = {
    _id: 'sel045238jdsnfsj23',
    email: 'foo@bar.com',
    firstName:  'John',
    lastName: 'Smith',
    address: '123 Street St',
    entryDate: '2014-05-07T17:32:20+00:00'
  };

  //record3 and record4 have same date and email
  const record3 = {
    _id: 'vug789238jdsnfsj23',
    email: 'foo1@bar.com',
    firstName:  'Blake',
    lastName: 'Douglas',
    address: '123 Reach St',
    entryDate: '2014-05-07T17:33:20+00:00'
  };

  const record4 = {
    _id: 'wuj08238jdsnfsj23',
    email: 'foo1@bar.com',
    firstName:  'Micah',
    lastName: 'Valmer',
    address: '123 Street St',
    entryDate: '2014-05-07T17:33:20+00:00'
  };

  it('returns a record that is newer in date', () => {
    const result = compare(record1, record2);

    expect(result).toBe(record2);
  });

}); 

