module.exports = (connection, DataTypes) => {
   const schema = {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "A title is required"
        },
        notNull: {
          args: [true],
          msg: "A title is required"
        }
      }
    },

    ISBN: {
      type: DataTypes.STRING
    }
  };
 
   const BookModel = connection.define('Book', schema);
   return BookModel;
 };