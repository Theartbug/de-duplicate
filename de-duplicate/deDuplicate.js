import leads from './leads.json';

export const compare = (current, next) => {
  //newest date trumps, else last in list
  return new Date(current.entryDate) > new Date(next.entryDate) 
    ? current
    : next; 
};

export const filter = (map, tracker) => {

  const filtered = {};

  for(let key in map) {

    //protect against filtering if there is only one record with that id / email
    if(map[key].length === 1) {
      filtered[key] = map[key][0];
      continue;
    } 
    
    //grab record prior to filter
    tracker[key] = { from: map[key][0] };

    //filter
    filtered[key] = map[key].reduce((prev, curr) => compare(prev, curr));

    tracker[key].to = filtered[key];

  }
  // console.log(tracker);

  return { filtered, tracker };
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

export const consolidateChangeLogs = (logs) => {

};

export const deDuplicate = (leads) => {

  const list = leads.leads;

  //loop over records first with _ids to find dups

  const { filtered: filteredIds, tracker: trackerIds } = filter(mapMaker(list, '_id'), {});

  //loop over again to filter out email dups

  const { filtered: finalOutput, tracker: finalTracker } = filter(mapMaker(Object.values(filteredIds), 'email'), trackerIds); 

  //provide a log of changes that include:
  //source record, output record
  //individual field changes (from, to)
  //output is in same format as input JSON

  return { 
    'source': list,
    'output': Object.values(finalOutput),
    'changes': finalTracker
  };
  

};