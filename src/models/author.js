module.exports = (connection, DataTypes) => {
   const schema = {

      author: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notNull: {
               args: [true],
               msg: "Author required in order to create one"
            },
            notEmpty: {
               args: [true],
               msg: "Author require in order to create one"
            }
         }
      },
   };
 
   const AuthorModel = connection.define('Author', schema);
   return AuthorModel;
};