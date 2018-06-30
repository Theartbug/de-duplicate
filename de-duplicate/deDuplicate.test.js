
import { deDuplicate, compare, filter, createFieldChanges, mapMaker } from './deDuplicate.js';
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

describe('mapMaker tests', () => {

  const idMap = 
  {'belr28238jdsnfsj23': [{'_id': 'belr28238jdsnfsj23', 'address': '123 Water St', 'email': 'mae@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Tallulah', 'lastName': 'Smith'}], 'edu45238jdsnfsj23': [{'_id': 'edu45238jdsnfsj23', 'address': '44 North Hampton St', 'email': 'mae@bar.com', 'entryDate': '2014-05-07T17:31:20+00:00', 'firstName': 'Ted', 'lastName': 'Masters'}], 'jkj238238jdsnfsj23': [{'_id': 'jkj238238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'jkj238238jdsnfsj23', 'address': '456 Neat St', 'email': 'coo@bar.com', 'entryDate':'2014-05-07T17:32:20+00:00', 'firstName': 'Ted', 'lastName': 'Jones'}, {'_id': 'jkj238238jdsnfsj23', 'address': '888 Mayberry St', 'email': 'bill@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}], 'qest38238jdsnfsj23': [{'_id': 'qest38238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate':'2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}], 'sel045238jdsnfsj23': [{'_id': 'sel045238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}], 'vug789238jdsnfsj23': [{'_id': 'vug789238jdsnfsj23', 'address': '123 Reach St', 'email': 'foo1@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Blake', 'lastName': 'Douglas'}], 'wabaj238238jdsnfsj23': [{'_id': 'wabaj238238jdsnfsj23', 'address': '8803 Dark St', 'email': 'bog@bar.com', 'entryDate': '2014-05-07T17:31:20+00:00', 'firstName': 'Fran', 'lastName': 'Jones'}], 'wuj08238jdsnfsj23': [{'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}]};

  it('makes a map', () => {
    const result = mapMaker(leads.leads, '_id');

    expect(result).toEqual(idMap);
  });
});

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

describe('createFieldChanges tests', () => {
  it('shows changed fields', () => {

    const changes1 = {
      '_id': 'jkj238238jdsnfsj23 -> sel045238jdsnfsj23', 'entryDate': '2014-05-07T17:30:20+00:00 -> 2014-05-07T17:32:20+00:00'
    };

    const changes2 = {
      '_id': 'vug789238jdsnfsj23 -> wuj08238jdsnfsj23', 'address': '123 Reach St -> 123 Street St', 'firstName': 'Blake -> Micah', 'lastName': 'Douglas -> Valmer'
    };

    const result = createFieldChanges(record1, record2);
    const result2 = createFieldChanges(record3, record4);

    expect(result).toEqual(changes1);
    expect(result2).toEqual(changes2);

  });
});

describe('filter tests', () => {

  const set = { 'foo@bar.com': 
  [{'_id': 'jkj238238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'sel045238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}, {'_id': 'qest38238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com','entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}]
  };

  const filteredSet = {'foo@bar.com': {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}};

  const tracker = {'foo@bar.com': {'field changes':{'_id': 'jkj238238jdsnfsj23 -> wuj08238jdsnfsj23', 'entryDate': '2014-05-07T17:30:20+00:00 -> 2014-05-07T17:33:20+00:00', 'firstName': 'John -> Micah', 'lastName': 'Smith -> Valmer'}, 'from': {'_id':'jkj238238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, 'to': {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}}};

  it('filters out all in set except for newest / most recent and tracks changes when filtering', () => {
    const result = filter(set, {});

    expect(result.filtered).toEqual(filteredSet);
    expect(result.tracker).toEqual(tracker);
  });

});

describe('deDuplicate tests', () => {

  const deDuped = 
  [{'_id': 'jkj238238jdsnfsj23', 'address': '888 Mayberry St', 'email': 'bill@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, {'_id': 'belr28238jdsnfsj23', 'address': '123 Water St', 'email': 'mae@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Tallulah', 'lastName': 'Smith'}, {'_id': 'wabaj238238jdsnfsj23', 'address': '8803 Dark St', 'email': 'bog@bar.com', 'entryDate': '2014-05-07T17:31:20+00:00', 'firstName': 'Fran', 'lastName': 'Jones'}, {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}, {'_id': 'vug789238jdsnfsj23', 'address': '123 Reach St', 'email': 'foo1@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Blake', 'lastName': 'Douglas'}];

  const changes = 
  [{'field changes': {'address': '123 Street St -> 888 Mayberry St', 'email': 'foo@bar.com -> bill@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00 -> 2014-05-07T17:33:20+00:00'}, 'from': {'_id': 'jkj238238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:30:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, 'to': {'_id': 'jkj238238jdsnfsj23', 'address': '888 Mayberry St', 'email': 'bill@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}}, {'field changes': {'_id': 'edu45238jdsnfsj23 -> belr28238jdsnfsj23', 'address': '44 North Hampton St -> 123 Water St', 'entryDate': '2014-05-07T17:31:20+00:00 -> 2014-05-07T17:33:20+00:00', 'firstName': 'Ted -> Tallulah', 'lastName': 'Masters -> Smith'}, 'from': {'_id': 'edu45238jdsnfsj23', 'address': '44 North Hampton St', 'email': 'mae@bar.com', 'entryDate': '2014-05-07T17:31:20+00:00', 'firstName': 'Ted', 'lastName': 'Masters'}, 'to': {'_id': 'belr28238jdsnfsj23', 'address': '123 Water St', 'email': 'mae@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Tallulah','lastName': 'Smith'}}, {'field changes': {'_id':'sel045238jdsnfsj23 -> wuj08238jdsnfsj23', 'entryDate': '2014-05-07T17:32:20+00:00 -> 2014-05-07T17:33:20+00:00', 'firstName': 'John -> Micah', 'lastName': 'Smith -> Valmer'}, 'from': {'_id': 'sel045238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:32:20+00:00', 'firstName': 'John', 'lastName': 'Smith'}, 'to': {'_id': 'wuj08238jdsnfsj23', 'address': '123 Street St', 'email': 'foo@bar.com', 'entryDate': '2014-05-07T17:33:20+00:00', 'firstName': 'Micah', 'lastName': 'Valmer'}}];

  it('returns a deduped list with field changes', () => {
    const result = deDuplicate(leads);

    expect(result['output']['leads']).toEqual(deDuped);
    expect(result['changes']).toEqual(changes);
  });
});

