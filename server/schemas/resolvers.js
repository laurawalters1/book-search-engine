const { Tech, User } = require("../models");

const resolvers = {
  Query: {
    me: async ({ user = null, params }) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: user ? user._id : params.id },
          { username: params.username },
        ],
      });

      if (!foundUser) {
        return console.log("No user with this id");
      }

      console.log(foundUser);
      return foundUser;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return console.log("Error");
      }
      const token = signToken(user);
      console.log(user);
      return { user, token };
    },
    // !Should this be a mutation or query?
    loginUser: async (parent, { username, email, password }) => {
      // !Will this implicit definition be valid?
      const user = await User.findOne({ $or: [{ username }, { email }] });
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
    saveBook: async (parent, { user, body }) => {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser);
        return updatedUser;
      } catch (err) {
        console.log(err);
        return;
      }
    },
    deleteBook: async (parent, { user, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
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
