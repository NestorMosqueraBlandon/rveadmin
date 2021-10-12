import {gql} from "@apollo/client"

export const CREATE_POST_MUTATION = gql`
mutation createPost($title: String!
    $description: String! 
    $markdown: String $category: String $image: String) {
   
        createPost(title: $title description: $description markdown: $markdown category: $category, image: $image)
    
}
`

export const DELETE_POST_MUTATION = gql`
mutation deletePost($id: String!) {
        deletePost(id: $id)
}
`