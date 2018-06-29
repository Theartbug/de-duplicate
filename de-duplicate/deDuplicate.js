
export const compare = (current, next) => {
  //newest date trumps
  return new Date(current.entryDate) > new Date(next.entryDate) 
    ? current
    : next; 
};

export const filter = (set) => {

  for(let key in set) {
    set[key] = set[key].reduce((prev, curr) => compare(prev, curr));
  }

  return set;
};

export const deDuplicate = (leads) => {

  const list = leads.leads;

  //define maps for the records
  const ids = {};
  const emails = {};

  //loop over records and place into respective maps
  for(let record of list) {

    const { _id, email } = record;
    //check email and _id for existence and place into new array within maps (to maintain order)

    emails[email] 
      ? emails[email].push(record) 
      : emails[email] = [record];

    ids[_id]
      ? ids[_id].push(record)
      : ids[_id] = [record];
  }

  //filter over each to remove dups

  const filteredIds = Object.values(filter(ids));
  const filteredEmails = Object.values(filter(emails));

  return {...filteredIds, ...filteredEmails };
  
  //provide a log of changes that include:
  //source record, output record
  //individual field changes (from, to)
  //output is in same format as input JSON

  
};