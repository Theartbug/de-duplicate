
export const compare = (current, next) => {
  //newest date trumps
  return new Date(current.entryDate) > new Date(next.entryDate) 
    ? current
    : next; 
};

export const filter = (map) => {

  for(let key in map) {
    map[key] = map[key].reduce((prev, curr) => compare(prev, curr));
  }

  return map;
};

export const mapMaker = (list, property) => {

  const map = {};

  for(let record of list) {
    const specificProperty = record[property];
    map[specificProperty] 
      ? map[specificProperty].push(record) 
      : map[specificProperty] = [record];
  }
  return map;

};

export const deDuplicate = (leads) => {

  const list = leads.leads;

  //loop over records first with _ids to find dups

  const filteredIds = Object.values(filter(mapMaker(list, '_id')));

  //loop over these to filter out email dups

  return { 'leads': Object.values(filter(mapMaker(filteredIds, 'email'))) };
  
  //provide a log of changes that include:
  //source record, output record
  //individual field changes (from, to)
  //output is in same format as input JSON

  
};