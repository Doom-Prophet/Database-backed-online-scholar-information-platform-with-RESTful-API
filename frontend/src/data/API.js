import axios from 'axios';
import {papers, posts, post, paper} from './mock_data';

const baseURL = 'https://cs409final.herokuapp.com/api'


/* User's APIs */ 
const GetUser = (email) => {
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/user', {
      params: {
        email: email,
      },
    })
    .then(response => {
      // console.log("getuser:",response);
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
  // console.log(user)
  return new Promise((resolve, reject) => {
    axios
    .post(baseURL+'/user/create', 
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
      // console.log(err)
      reject(err);
    });
  })
};


const PutUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
    .put(baseURL+'/user/'+user.id, JSON.stringify(user),
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
  // console.log("id:"+id);
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/paper/'+id)
    .then(response => {
      resolve(response.data.data);
    })
    .catch(err => {
      reject(err);
    });
  })
};


const GetPaperList = (keywords=null, ids=null, limit=10, offset=0) => {
  // return new Promise((resolve, reject) => {
  //   resolve(papers);
  // });
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
  // console.log('GET POST')
  // return new Promise((resolve, reject) => {
  //   resolve(posts);
  // });
  return new Promise((resolve, reject) => {
    axios
    .get(baseURL+'/posts',{
      params: {
        field: field,
        where: ids,
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
    // resolve(post);
    axios
    .post(baseURL+'/post/create', 
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

const PutPost = (post) => {
  console.log(post);
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