import React, { useEffect } from 'react'
import {
  useMutation,
  useQuery,
} from "@apollo/client";

import { LOAD_POSTS } from '../../GrapgQL/Queries';
import LoadingBox from '../../components/LoadingBox';
import * as timeago from 'timeago.js';
import swal from 'sweetalert';
import { DELETE_POST_MUTATION } from '../../GrapgQL/Mutation';
export default function PostScreen(props) {

  const { loading, error, data } = useQuery(LOAD_POSTS)

  useEffect(() => {
  }, [data])

  const createPost = () => {
    props.history.push("/createpost")
  }

  const [deletePost, {error: errorDelete}] = useMutation(DELETE_POST_MUTATION)

  const deleteHandler = (post) => {
    swal('Are you sure to delete ' + post.title + '?', {
      icon: 'warning',
      buttons: ['Obviously not', 'Do that!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + post.title + ' deleted', {
          icon: 'success',
        });
        deletePost({
          variables: {
              id: post.id,
          }
      })
      window.location.replace('');
      }
    });
  };


  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="clean__card">
      <div className="card__header">
        <h2>Posts</h2>
        <div className="buttons">
          <button className="btn" onClick={() => createPost()}>
            Create Post
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingBox color="white"></LoadingBox>
      ) :
        (
          <div className="clen__body">
            <table>
              <thead>
                <tr className="thead">
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{timeago.format(post.createdAt)}</td>
                    <td>
                    <button className="btn-icon">
                        <i className="bx bx-pencil"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => deleteHandler(post)}
                      >
                        <i className="bx bx-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}