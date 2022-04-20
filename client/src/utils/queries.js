// This will store all of the GraphQL query requests

import { gql } from "@apollo/client";

// Tagged template literal using imported gql function
export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thoughts(usernamen: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;
   