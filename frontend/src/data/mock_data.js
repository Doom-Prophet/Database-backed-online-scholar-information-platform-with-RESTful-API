const paper = {
    'id':123,
    'title': "Practical Machine Learning Tools and Techniques",
    'year': "2022",
    'authors': ["Author A", "Author B", "Author C", "Author D"],
    'citations': 30,
    'abstract': "Practical Machine Learning Tools and Techniques offers a thorough grounding in machine learning concepts as well as practical advice on applying machine learning tools and techniques in real-world data mining situations. This highly anticipated third edition of the most acclaimed work on data mining and machine learning will teach you everything you need to know about preparing inputs, interpreting outputs, evaluating results, and the algorithmic methods at the heart of successful data mining. Thorough updates reflect the technical changes and modernizations that have taken place in the field since the last edition, including new material on Data Transformations, Ensemble Learning, Massive Data Sets, Multi-instance Learning, plus a new version of the popular Weka machine learning software developed by the authors. Witten, Frank, and Hall include both tried-and-true techniques of today as well as methods at the leading edge of contemporary research. *Provides a thorough grounding in machine learning concepts as well as practical advice on applying the tools and techniques to your data mining projects *Offers concrete tips and techniques for performance improvement that work by transforming the input or output in machine learning methods *Includes downloadable Weka software toolkit, a collection of machine learning algorithms for data mining tasks-in an updated, interactive interface. Algorithms in toolkit cover: data pre-processing, classification, regression, clustering, association rules, visualization​",
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
    'title': "paper A",
    'year': "2022",
    'authors': ["Author A", "Author B", "Author C", "Author D"],
    'citations': 30,
    'abstract': "A long abstract",
    'venue': "ACCV"
    },

    {
        'id':1234,
        'title': "paper B",
        'year': "2024",
        'authors': ["Author A"],
        'citations': 12,
        'abstract': "A long abstract",
        'venue': "ACCV"
    }

]


export {posts, paper, papers} ;