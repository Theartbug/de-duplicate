# de-duplicate

### To run

1. clone the git repository
1. ``npm i``
1. ``cd de-duplicate``
1. ``node --experimental-modules deDuplicate.mjs``

Objective
===

Take a variable number of identically structured json records and de-duplicate the set using javascript.
An example file of records is given in the accompanying 'leads.json'. Output should be same format, with dups reconciled according to the following rules:

1. The data from the newest date should be preferred
1. duplicate IDs count as dups. Duplicate emails count as dups. Both must be unique in our dataset. Duplicate values elsewhere do not count as dups.
1. If the dates are identical the data from the record provided last in the list should be preferred
1. The application should also provide a log of changes including some representation of the source record, the output record and the individual field changes (value from and value to) for each field.
*Simplifying assumption: the program can do everything in memory (don't worry about large files)*

Steps Taken
===

I started with writing pseudocode comments and functions I would need. I prepared some tests using jest. I have multiple helper functions to create an massage the data into their proper forms. I created a helper function *mapMaker* to create a map of records that matched a given property, in this case either id or email. After a map was created I used a helper function *filter* to clear out duplicates according to their date / last in list with the helper function *compare*. Within *filter* changes were logged using the helper function *createFieldChanges*. Finally results were returned in the form of an object with the fields of *source*, *output*, and *changes*.

Reflection / Changes
===

I initially began the problem with keeping a map of both the emails and ids with corresponding records and tried to find a way to de-dup each of them at once, then merge them. I realized I should de-dup by one first (I picked ids first), then the next one from that filtered list. I then struggled for a bit to figure out the best place to log changes between fields and records. I picked the *filter* function to keep track of changes, as that function would know if a record was changed, and the final record it would turn into. I then dropped *createFildChanges* into it.

I created simple tests as I went along, and it helped me better determine the shape of my data and results. If the *de-duplicate* function starts with email instead of ids, the output is the same except the order of records within the output object. You can test this by swapping the strings `'_id'` and `'email'` on lines 75 and 79. The tests will fail since they are expecting a particular object order, but the records are the same.

I was concerned that the *changes* log would be inaccurate since it logs changes first by ids then by emails. Perhaps there would be a misshap where an id was was changed in the first go, only to be removed again in the email de-dupping. The log would unnecessarily exist in that case. I added an extra test record to the *leads.json* array: 

```
{
  "_id": "jkj238238jdsnfsj21",
  "email": "bill@bar.com",
  "firstName":  "TEST",
  "lastName": "TEST",
  "address": "TEST",
  "entryDate": "2014-05-07T17:33:20+00:00"
 }
```

This record had the same email (bill@bar.com) as another record, but a different id. So on the first de-duping with grouped ids, the other record with the same email (bill@bar.com) replaced another with the same id (jkj238238jdsnfsj23). This change was logged:

```
{ 
  from:
    { _id: 'jkj238238jdsnfsj23',
      email: 'foo@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '123 Street St',
      entryDate: '2014-05-07T17:30:20+00:00' 
      },
  to:
    { _id: 'jkj238238jdsnfsj23',
      email: 'bill@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '888 Mayberry St',
      entryDate: '2014-05-07T17:33:20+00:00'
    }
}
```
Then when emails were grouped together and de-duped, another log was created with my test case:
 
 ```
 { 
  from:
    { _id: 'jkj238238jdsnfsj23',
      email: 'bill@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '888 Mayberry St',
      entryDate: '2014-05-07T17:33:20+00:00' 
    },
  to:
    { _id: 'jkj238238jdsnfsj21',
      email: 'bill@bar.com',
      firstName: 'TEST',
      lastName: 'TEST',
      address: 'TEST',
      entryDate: '2014-05-07T17:33:20+00:00' 
     }
}
 ```

I began to create a check in the *filter* function that would see if a record's id previously existed in the logs so it would be caught during the email de-duping. But then I realized that a log that looks like this:

 ```
 { 
  from:
    { _id: 'jkj238238jdsnfsj23',
      email: 'foo@bar.com',
      firstName: 'John',
      lastName: 'Smith',
      address: '123 Street St',
      entryDate: '2014-05-07T17:30:20+00:00' 
     },
  to:
    { _id: 'jkj238238jdsnfsj21',
      email: 'bill@bar.com',
      firstName: 'TEST',
      lastName: 'TEST',
      address: 'TEST',
      entryDate: '2014-05-07T17:33:20+00:00' 
     }
}
 ```
Could possibly be even more confusing since the records do not have matching ids or emails! so I decided to let both logs stay so there was clear path between the two levels of de-duping.
