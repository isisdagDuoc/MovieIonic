export const userData =
{
    "users": [
        {
        "id": 1,
        "name": "Alice",
        "email": "test@gmail.com",
        "password": "1234",
        "movies": [
            {
                "id": 1,
                "title": "Inception",
                "year": 2010,
                "rating": 8.8,
                "director": "Christopher Nolan",
                "directorId": 1,
                "genre": "Ciencia Ficción",
                "image": "/images/inception.jpg",
            },
            {
                "id": 2,
                "title": "The Matrix",
                "year": 1999,
                "rating": 8.7,
                "director": "Lana Wachowski, Lilly Wachowski",
                "directorId": 2,
                "genre": "Ciencia Ficción",
                "image": "/images/matrix.jpg",
            },
            {
                "id": 6,
                "title": "Goodfellas",
                "year": 1990,
                "rating": 8.7,
                "director": "Martin Scorsese",
                "directorId": 5,
                "genre": "Crimen",
                "image": "/images/goodfellas.jpg",
            },
            {
                "id": 7,
                "title": "Pulp Fiction",
                "year": 1994,
                "rating": 8.9,
                "director": "Quentin Tarantino",
                "directorId": 6,
                "genre": "Crimen",
                "image": "/images/pulp.jpg",
            }
        ]
        },
                {
            "id": 2,
            "name": "isis",
            "email": "isis@gmail.com",
            "password": "1234",
            "movies": [
                {
                    "id": 3,
                    "title": "Interstellar",
                    "year": 2014,
                    "rating": 8.6,
                    "director": "Christopher Nolan",
                    "directorId": 1,
                    "genre": "Ciencia Ficción",
                    "image": "/images/interstellar.jpg",
                },
                {
                    "id": 4,
                    "title": "Orgullo y Prejuicio",
                    "year": 2005,
                    "rating": 8.6,
                    "director": "Joe Wright",
                    "directorId": 5,
                    "genre": "Romance",
                    "image": "/images/orgullo.jpg",
                },
                {
                    "id": 5,
                    "title": "Jurassic Park",
                    "year": 1993,
                    "rating": 8.1,
                    "director": "Steven Spielberg",
                    "directorId": 4,
                    "genre": "Aventura",
                    "image": "/images/jurassic.jpg",
                },
                {
                    "id": 8,
                    "title": "The Wolf of Wall Street",
                    "year": 2013,
                    "rating": 8.2,
                    "director": "Martin Scorsese",
                    "directorId": 5,
                    "genre": "Comedia",
                    "image": "/images/wolf.jpg",
                }
            ]
        },
       ],
       directors: [
        {
            "name": "Christopher Nolan",
            "id": 1,
            "birthYear": 1970,
            "nationality": "British-American",
            "image": "/images/nolan.jpg",
            "movies": [3]
        },
        {
            "name": "Lana Wachowski",
            "id": 2,
            "birthYear": 1965,
            "nationality": "American",
            "image": "/images/lana.jpg",
            "movies": [2]
        },
        {
            "name": "Lilly Wachowski",
            "id": 3,
            "birthYear": 1967,
            "nationality": "American",
            "image": "/images/lili.jpg",
            "movies": [2]
        },
        {
            "name": "Steven Spielberg",
            "id": 4,
            "birthYear": 1946,
            "nationality": "American",
            "image": "/images/spielberg.jpg",
            "movies": [5]
        },
        {
            "name": "Martin Scorsese",
            "id": 5,
            "birthYear": 1942,
            "nationality": "American",
            "image": "/images/martin-scorsese.jpg",
            "movies": [6, 8]
        },
        {
            "name": "Quentin Tarantino",
            "id": 6,
            "birthYear": 1963,
            "nationality": "American",
            "image": "/images/tarantino.jpg",
            "movies": [7]
        },
       ],
               "comments": [
            {
                "userId": 1,
                "name": "Alice",
                "text": "Orgullo y Prejuicio es una película hermosa, con una historia de amor conmovedora.",
            },
            {
                "userId": 2,
                "name": "isis",
                "text": "Jurassic Park es un clásico de la ciencia ficción, ¡me encanta!",
            },
            {
                "userId": 1,
                "name": "Alice",
                "text": "Inception es una obra maestra de Christopher Nolan, ¡me dejó sin aliento!",
            },
            {
                "userId": 2,
                "name": "isis",
                "text": "The Matrix cambió mi forma de ver el cine, ¡es increíble!",
            },
            {
                "userId": 1,
                "name": "Alice",
                "text": "Pulp Fiction es una película icónica, ¡me encanta la narrativa no lineal!",
            },
            {
                "userId": 2,
                "name": "isis",
                "text": "Goodfellas es una obra maestra del cine de crimen, ¡la actuación es impresionante!",
            },
            {
                "userId": 1,
                "name": "Alice",
                "text": "Interstellar es una experiencia visual y emocional única, ¡me hizo reflexionar sobre el tiempo y el amor!",
            },
            {
                "userId": 2,
                "name": "isis",
                "text": "The Wolf of Wall Street es una película divertida y provocativa, ¡Leonardo DiCaprio está increíble!",
            }
    ]
}