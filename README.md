
```
cd demo
npm install && npm start
```

# The Magic

```
    actions.createdCrossfilter({
      dataset   : titanic,
      dimensions: [
        {type: 'linear', name: 'Age', function: (row) => +row.age},
        {type: 'ordinal', name: 'Boat', function: (row) => +row.boat},
        {type: 'ordinal', name: 'Class', function: (row) => row.pclass},
        {type: 'ordinal', name: 'Gender', function: (row) => row.sex},
        {type: 'ordinal', name: 'Survived?', function: (row) => row.survived},
        {type: 'ordinal', name: 'Age available in data?', function: (row) => row.age !== null},
      ],
      groups    : [
        {name: 'Age', function: (data) => data},
        {name: 'Boat', function: (data) => data},
        {name: 'Class', function: (data) => data},
        {name: 'Survived?', function: (data) => data},
        {name: 'Gender', function: (data) => data},
        {name: 'Age available in data?', function: (data) => data},
      ]
    });
```

I'll be creating a short hand for this soon; but essentially any dimensions you create here with a corresponding group will show up on the dashboard.

Most of the groupers you could use would be basic `(val) => val` returns per the example. The 'Age available' interrogative is an example of creating a new dimension outside of what's in `./data/titanic.js` to begin with.
