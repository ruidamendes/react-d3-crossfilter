
```
cd demo
npm install && npm start
```

# The Magic

```
actions.createdCrossfilter({
      dataset   : titanic,
      attributes: [
        {
          type     : 'linear',
          name     : 'Age',
          dimension: row => +row.age,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Boat',
          dimension: row => +row.boat, // heh
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Class',
          dimension: row => row.pclass,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Gender',
          dimension: row => row.sex,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Survived?',
          dimension: row => row.survived,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Age available in data?',
          dimension: row => row.age !== null,
          grouper  : data => data
        },
      ]
    });
  }
```

Most of the groupers you could use would be basic `(val) => val` returns per the example. The 'Age available' interrogative is an example of creating a new dimension outside of what's in `./data/titanic.js` to begin with.
