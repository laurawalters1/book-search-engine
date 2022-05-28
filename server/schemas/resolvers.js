const { Tech, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("Please log in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // !Should this be a mutation or query?
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return console.log("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return console.log("Wrong password");
      }
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: args.input } },
            { new: true, runValidators: true }
          );

          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.log(err);
        return;
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      console.log(bookId);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        // !Will this implicit definition be valid?
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return console.log("user not found");
      }
      console.log(updatedUser);
      return updatedUser;
    },
  },
};

module.exports = resolvers;
