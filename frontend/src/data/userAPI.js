import axios from 'axios';
const baseURL = 'https://9bfeaf60-09b0-4a0d-b89d-475ab011b395.mock.pstmn.io/api'

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
      const data = { id: user._id, email: user.email, name: user.user_name, field: user.research_field };
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
      const data = { id: user._id, email: user.email, name: user.user_name, field: user.research_field };
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
    .put(baseURL+'/users/'+user.id, {
      data: user,
    })
    .then(response => {
      const user = response.data.data;
      const data = { email: user.email, name: user.user_name, field: user.research_field };
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  })
};


export {GetUser, PostUser};