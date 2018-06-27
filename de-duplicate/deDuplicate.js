
export const compare = (current, next) => {
  //newest date trumps
  
  
  
  //otherwise furthest down in list
};

export const deDuplicate = (leads) => {

  //define a set for the de-duped records

  const deDuped = {};

  //de-stringify the JSON
  const leadsWithDups = JSON.parse(leads);
  //loop over records
  for(let record of leadsWithDups) {

    const { _id, email } = record;
    //check email and _id for existence and place into new set if not

    if(deDuped[email]) {
    //if they do exist, begin other checks
    
      deDuped[email] = compare(deDuped[email], record);

    } 
    else deDuped[email] = record;

    if(deDuped[_id]) {
    //if they do exist, begin other checks
      deDuped[_id] = compare(deDuped[_id], record);

    } 
    else deDuped[_id] = record;
  }
  
  //provide a log of changes that include:
  //source record, output record
  //individual field changes (from, to)
  //output is in same format as input JSON

  return deDuped;
  
};