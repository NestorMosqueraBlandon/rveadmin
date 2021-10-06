import {gql} from "@apollo/client"

export const CREATE_POST_MUTATION = gql`
mutation createPost($title: String!
    $description: String! 
    $markdown: String $category: String) {
   
        createPost(title: $title description: $description markdown: $markdown category: $category)
    
}
`