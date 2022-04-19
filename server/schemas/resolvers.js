const { AuthenticateError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Thought } = require("../models");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({})
                .select("-__v -password")
                .populate("thoughts")
                .populate("friends");

                return userData;
            }
            throw new AuthenticateError("Not logged in");
        },
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
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticateError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticateError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        addThought: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.usernamen });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: {thoughts: thought._id } },
                    { new: true } // returns updated document, w/o it it would return the original
                );

                return thought;
            }
            throw new AuthenticateError("You need to be logged in!");
        },
        addReaction: async(parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
                const udpatedThought = await Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return udpatedThought;
            }

            throw new AuthenticateError("You need to be logged in!");
        },
        addFriend: async(parent, { friendsId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                )
                .populate("friends");

                return updatedUser;
            }

            throw new AuthenticateError("You need to be logged in!");
        }
    }

};

module.exports = resolvers;