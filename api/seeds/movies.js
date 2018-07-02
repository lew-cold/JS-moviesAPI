const Movie = require('../models/movie')

Movie.create([
    {
        title: 'Me, Myself and Irene',
        yearReleased: 2001,
        rating:
        {
            code: "U",
            description: "Universal"
        },
        description: 'A split personality ravages through a Rhode Island cop'
    },
    {
        title: 'Star Trek - Nemesis',
        yearReleased: 2008,
        rating:
        {
            code: "U",
            description: "Universal"
        },
        description: 'A future inter galactic battle is to begin'
    },
    {
        title: 'Scary Movie 2',
        yearReleased: 2009,
        rating:
        {
            code: "U",
            description: "Universal"
        },
        description: 'Will you take the strong hand?'
    }
])