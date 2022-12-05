const paper = {
    'id':123,
    'title': "paper A",
    'year': "2022",
    'authors': ["Author A", "Author B", "Author C", "Author D"],
    'citations': 30,
    'abstract': "A long abstract",
    'venue': "ACCV"
};

const posts = [
    {
        "Created_date": Date('2022-10-12'),
        "User_id": 'UserId123',
        "User_name": 'testPoster1',
        "Content": 'This is a post.',
        "Like_users": [],
        "Paper": paper,
        "Field": "Data Mining"
    },
    {
        "Created_date": Date('2022-10-11'),
        "User_id": 'UserId123',
        "User_name": 'testPoster1',
        "Content": 'This is a post.',
        "Like_users": [],
        "Paper": paper,
        "Field": "Machine Learning"
    },
    {
        "Created_date": Date('2022-10-12'),
        "User_id": 'UserId123',
        "User_name": 'testPoster2',
        "Content": 'This is a post.',
        "Like_users": [],
        "Paper": paper,
        "Field": "testField"
    },
    
    {
        "Created_date": Date('2022-10-13'),
        "User_id": 'UserId123',
        "User_name": 'testPoster1',
        "Content": 'This is a post.',
        "Like_users": [],
        "Paper": paper,
        "Field": "testField"
    }
];

const users = [

]



const papers = [
    {
    'id':123,
    'name': "paper A",
    'year': "2022",
    'authors': ["Author A", "Author B", "Author C", "Author D"],
    'citations': 30,
    'abstract': "A long abstract",
    'venue': "ACCV"
    },

    {
        'id':1234,
        'name': "paper B",
        'year': "2024",
        'authors': ["Author A"],
        'citations': 12,
        'abstract': "A long abstract",
        'venue': "ACCV"
    }

]


export {posts, paper, papers} ;