const configAxios = (method, url, data) => {
    data = data || {};
    const config = {
      method: method, // get post patch delete 
      url: url,
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: data,
    };
    return config;
  };
  
  export default configAxios;