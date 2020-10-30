import { useState, useEffect } from 'react';
import axios from 'axios';

const usePutRequest = (url, newStatedata) => {

  const [request, setRequest] = useState({
    data: {},
    loading: true,
    errorMsg: ''
  });

  useEffect(() => {
    
    axios.put(url, newStatedata)
    .then((res) => {
      console.log("Response status: ",  res.status)
      setRequest(prev => ({
        ...prev,
        loading: false,
        data: res.data,
        errorMsg: ''
      }));
    })
    .catch(err => {
      console.log(err);
      setRequest(prev => ({
        ...prev,
        loading: false,
        errorMsg: 'Error loading data'
      }));
    });
  }, [url, newStatedata])

  return request;
}

export default usePutRequest;