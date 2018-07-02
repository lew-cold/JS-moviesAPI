const Person = require('../models/person')

Person.create([
{
    name: { first: 'Lewis', last: 'Coldwell' }
},
{
    name: { first: 'John', last: 'Smith' }
},
{
    name: { first: 'Luke', last: 'Skywalker' }
}
])