import React from 'react';
import { useState, useEffect} from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { searchQuery, feedQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  console.log(pins);

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false)
        })
    } else {
        client.fetch(feedQuery)
          .then((data) => {
            setPins(data);
            setLoading(false)
          })
    }
  }, [categoryId])

  if(loading) {
    return <Spinner message="We are adding new ideas to your feed!"/>
  }
  
  return (
    <div>{pins && <MasonryLayout pins={pins}/>}</div>
  )
}

export default Feed