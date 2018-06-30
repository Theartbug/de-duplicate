# de-duplicate

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

I created simple tests as I went along, and it helped me better determine the shape of my data and results.

I was concerned that the *changes* log would be inaccurate since it logs changes first by ids then by emails. Perhaps there would be a misshap where an id was was changed in the first go, only to be removed again in the email de-dupping. The log would unnecissarily exist in that case. In that case I could create another helper function that looks through every *from* and *to* log, seeing if a *to* of one log matches a *from* of a sequential log. I decided to not do this as the results from the leads.json file appeared clear.
