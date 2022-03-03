module.exports = (connection, DataTypes) => {
   const schema = {

    title: {
      type: DataTypes.STRING,
      validate: {
        isIn: [[
          'Guide to Backend', 
          'Full of Toblerone', 
          'Big Book of Cats', 
          'REST Principles'
        ]]
      }
    },

    author: {
      type: DataTypes.STRING,
      validate: {
        isIn: [[
          'Dan Hembery', 
          'Disc0des', 
          'Nyancat', 
          'Manchester Codes'
        ]]
      }
    },

    genre: {
      type: DataTypes.STRING,
    },

    ISBN: {
      type: DataTypes.STRING
    }
  };
 
   const BookModel = connection.define('Book', schema);
   return BookModel;
 };