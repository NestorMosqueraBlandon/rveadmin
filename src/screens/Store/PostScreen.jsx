import React, { useEffect, useState } from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

import { LOAD_POSTS } from '../../GrapgQL/Queries';
export default function PostScreen() {
     
const {loading, error, data} = useQuery(LOAD_POSTS)
const {posts, setPosts} = useState([]);

useEffect(() => {
    // if(data){
    //     setPosts(data.posts)
    // }

    console.log(data)
}, [data])

if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    return (
        <div>
            {data.posts.map((d) =>(

            <div key={d.id}>
                <h2>{d.title}</h2>
                <div dangerouslySetInnerHTML={{__html: d.sanitizedHtml}}></div>

                </div>
                ) 
             )}
        </div>
    )
}
