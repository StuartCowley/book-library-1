module.exports = (connection, DataTypes) => {
  
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
      
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [8]
      }
    }
  }


  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};