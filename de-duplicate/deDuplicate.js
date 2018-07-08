import leads from './leads.json';

//to run type: node --experimental-modules deDuplicate.mjs in console.
//to test type: npm run test

export const mapMaker = (list, property) => {

  //O(n) complexity

  const map = {};

  for(let record of list) {
    const specificProperty = record[property];
    map[specificProperty] 
      ? map[specificProperty].push(record) 
      : map[specificProperty] = [record];
  }
  return map;

};

export const compare = (current, next) => {
  //newest date trumps, else last in list
  //O(1) complexity
  return new Date(current.entryDate) > new Date(next.entryDate) 
    ? current
    : next; 
};

export const filter = (map, tracker = {}) => {

  //O(n^2) complexity due to createFieldChanges and .reduce

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


    //set record after filter
    tracker[key].to = filtered[key];

    //save field changes
    tracker[key]['field changes'] = createFieldChanges(tracker[key].from, tracker[key].to);
  }

  return { filtered, tracker };
};

export const createFieldChanges = (from, to) => {

  //O(n) complexity

  const changes = {};

  for(let entry in from) {
    //if the entries are the same, continue
    if(from[entry] === to[entry]) continue;

    changes[entry] = `${from[entry]} -> ${to[entry]}`;
  }

  return changes;
};

export const deDuplicate = (leads) => {

  //O(n^2 complexity due to filter)

  const list = leads.leads;

  //loop over records first with _ids to find dups

  const { filtered: filteredIds, tracker: trackerIds } = filter(mapMaker(list, '_id'));

  //loop over again to filter out email dups

  const { filtered: finalOutput, tracker: finalTracker } = filter(mapMaker(Object.values(filteredIds), 'email'), trackerIds); 

  //provide a log of changes that include:
  //source record, output record
  //individual field changes (from, to)
  //output is in same format as input JSON

  return { 
    'source': leads,
    'output': { 'leads': Object.values(finalOutput) },
    'changes': Object.values(finalTracker)
  };
  

};

(function() {
  const { source, output, changes } = deDuplicate(leads);

  //have to pry them off the original return so the deeper objects will print to console.

  console.log('source', source);
  console.log('output', output);
  console.log('changes', changes);
})();
