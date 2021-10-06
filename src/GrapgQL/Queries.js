import gql from "graphql-tag";

export const LOAD_POSTS = gql`
    query {
        posts{
            id
            title
            sanitizedHtml
            category
        }
    }
`