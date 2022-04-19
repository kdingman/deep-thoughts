const { User, Thought } = require("../models");

const resolvers = {
    Query: {
        // GET all Users
        users: async() => {
            return User.find()
                .select("-__v -password") // omits __v property and user password
                .populate("friends") // populate to receive any associated data
                .populate("thoughts") // populate to receive any associate data
        },
        // GET a User by username
        user: async (parent, { username }) => { // parent is used as a placeholder
            return User.findOne({ username })
            .select("-__v -password")
            .populate("friends")
            .populate("thoughts")
        },
        thoughts: async (parent, { username }) => { // parent is used as a placeholder
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 }); // desending order
        },
        thought: async (parent, { _id }) => { // destruction _id argument
            return Thought.findOne({ _id });
        }
    }
};

module.exports = resolvers;