import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CREATE_POST_MUTATION } from '../../GrapgQL/Mutation';

export default function CreatePostScreen(props) {


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [category, setCategory] = useState("Noticias");

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION)
    
    const username = userInfo.name;
    const userphoto = userInfo.image;

    const addPost = () => {

        createPost({
            variables: {
                title: title,
                description: description,
                markdown: markdown,
                category: category,
                image: image,
                username: username,
                userphoto: userphoto
            }
        })

        setTimeout(() => {
            window.location.replace('/post');
        }, 1500)
        // props.history.push("/post");
        
    }

    useEffect(() => {

    }, [props.history])

    if(error){
        console.log(error)
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                </div>
                <div className="form-group">
                    <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                        <option value="Noticias">Noticias</option>
                        <option value="Reviews">Reviews</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                    </select>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />

                </div>
                <div className="form-group">
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                </div>
               
                <div className="form-group">
                    <textarea name="" id="" value={markdown} onChange={(e) => setMarkdown(e.target.value)} cols="30" placeholder="Text" rows="10">

                    </textarea>
                </div>
               


            </form>
            <button onClick={addPost}>Create Post</button>
        </div>
    )
}
