
import { deDuplicate, compare, filter } from './deDuplicate';
import leads from './leads.json';

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

describe('compare tests', () => {

  it('returns a record that is newer in date', () => {
    const result = compare(record1, record2);

    expect(result).toBe(record2);
  });

  it('returns a record that is next if they are equal in date', () => {
    const result = compare(record3, record4);

    expect(result).toBe(record4);
  });

}); 

// describe('filter tests', () => {

//   const set = { 'foo@bar.com': 
//   [{'_id': 'jkj238238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'sel045238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}, {'_id': 'qest38238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com','entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}]
//   };

//   const filteredSet = {'foo@bar.com': {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}};

//   const tracker = { 'foo@bar.com':       { from:          { _id: 'jkj238238jdsnfsj23',            address: '123 Street St',            email: 'foo@bar.com',            entryDate: '2014-05-07T17:30:20+00:00',            firstName: 'John',
//   lastName: 'Smith' },
// to:
// { _id: 'wuj08238jdsnfsj23',
//   address: '123 Street St',            email: 'foo@bar.com',
//   entryDate: '2014-05-07T17:33:20+00:00',
//   firstName: 'Micah',
//   lastName: 'Valmer' } } };

//   it('filters out all in set except for newest / most recent and tracks changes when filtering', () => {
//     const result = filter(set, {});

//     expect(result.filtered).toEqual(filteredSet);
//     expect(result.tracker).toEqual(tracker);
//   });

// });

describe('deDuplicate tests', () => {

  const deDuped = 
  [{"_id": "jkj238238jdsnfsj23", "address": "888 Mayberry St", "email": "bill@bar.com", "entryDate": "2014-05-07T17:33:20+00:00", "firstName": "John", "lastName": "Smith"}, {"_id": "belr28238jdsnfsj23", "address": "123 Water St", "email": "mae@bar.com", "entryDate": "2014-05-07T17:33:20+00:00", "firstName": "Tallulah", "lastName": "Smith"}, {"_id": "wabaj238238jdsnfsj23", "address": "8803 Dark St", "email": "bog@bar.com", "entryDate": "2014-05-07T17:31:20+00:00", "firstName": "Fran", "lastName": "Jones"}, {"_id": "wuj08238jdsnfsj23", "address": "123 Street St", "email": "foo@bar.com", "entryDate": "2014-05-07T17:33:20+00:00", "firstName": "Micah", "lastName": "Valmer"}, {"_id": "vug789238jdsnfsj23", "address": "123 Reach St", "email": "foo1@bar.com", "entryDate": "2014-05-07T17:33:20+00:00", "firstName": "Blake", "lastName": "Douglas"}];

  it('returns a deduped list', () => {
    const result = deDuplicate(leads);

    expect(result['output']).toEqual(deDuped);
    expect(result['changes']).toEqual({});
  });
});

