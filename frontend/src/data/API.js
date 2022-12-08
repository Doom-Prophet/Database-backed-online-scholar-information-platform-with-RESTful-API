import axios from 'axios';
import {papers, posts, post, paper} from './mock_data';

const baseURL = 'https://9bfeaf60-09b0-4a0d-b89d-475ab011b395.mock.pstmn.io/api'


/* User's APIs */ 
const GetUser = (email) => {
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/users', {
      params: {
        email: email,
      },
    })
    .then(response => {
      const user = response.data.data;
      const data = { id: user._id, email: user.email, name: user.user_name, field: user.research_field, papers: user.favorite_papers, posts: user.posts};
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  })
};

const PostUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
    .post(baseURL+'/users', 
      JSON.stringify({
        "user_name": user.name,
        "email": user.email,
        "research_field": user.field
      }),
      {headers: {
        'Content-Type': 'application/json',
      }}
    )
    .then(response => {
      const user = response.data.data;
      const data = { id: user._id, email: user.email, name: user.user_name, field: user.research_field, papers:[], posts:[]};
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  })
};


const PutUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
    .put(baseURL+'/users/'+user.id, JSON.stringify(user),
    {headers: {
      'Content-Type': 'application/json',
    }})
    .then(response => {
      const user = response.data.data;
      const data = { email: user.email, name: user.user_name, field: user.research_field, papers: user.favorite_papers, posts: user.posts };
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  })
};



/* Paper's APIs */ 
const GetPaperDetail = (id) => {
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/papers/'+id)
    .then(response => {
      resolve(response.data.data);
    })
    .catch(err => {
      reject(err);
    });
  })
};


const GetPaperList = (keywords=null, ids=null, limit=10, offset=0) => {
  return new Promise((resolve, reject) => {
    resolve(papers);
  });
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/papers',{
      params: {
        // where: keywords ? {"title": {"$regex": keywords} } : null,
        keywords: keywords,
        where: ids? {"_id": {"$in": ids}} : null,
        limit: limit,
        offset: offset
      },
    })
    .then(response => {
      resolve(response.data.data);
    })
    .catch(err => {
      reject(err);
    });
  })
}

/* Post API */
const GetPosts = (field=null, ids=null, limit=10, offset=0) => {
  console.log('GET POST')
  return new Promise((resolve, reject) => {
    resolve(posts);
  });
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/posts',{
      params: {
        field: field,
        where: ids? {"_id": {"$in": ids}} : null,
        limit: limit,
        offset: offset
      },
    })
    .then(response => {
      resolve(response.data.data);
    })
    .catch(err => {
      reject(err);
    });
  })
}

const PostPost = (post) => {
  return new Promise((resolve, reject) => {
    resolve(post);
    // axios
    // .post(baseURL+'/posts', 
    //   JSON.stringify(post),
    //   {headers: {
    //     'Content-Type': 'application/json',
    //   }}
    // )
    // .then(response => {
    //   resolve(response.data.data);
    // })
    // .catch(err => {
    //   reject(err);
    // });
  })
};

const PutPost = (post) => {
  return new Promise((resolve, reject) => {
    axios
    .put(baseURL+'/posts', 
      JSON.stringify(post),
      {headers: {
        'Content-Type': 'application/json',
      }}
    )
    .then(response => {
      resolve(response.data.data);
    })
    .catch(err => {
      reject(err);
    });
  })
};



export {GetUser, PostUser, PutUser, GetPaperDetail, GetPaperList, GetPosts, PostPost, PutPost};