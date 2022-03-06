module.exports = (connection, DataTypes) => {
   const schema = {

      genre: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notNull: {
               args: [true],
               msg: "Genre required in order to create one"
            },
            notEmpty: {
               args: [true],
               msg: "Genre required in order to create one"
            }
         }
      },
   };
 
   const GenreModel = connection.define('Genre', schema);
   return GenreModel;
};