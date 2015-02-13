export default (sequelize, DataTypes) => {
  var Photo = sequelize.define('Photo', {
    type: DataTypes.STRING,
    bucket: DataTypes.STRING,
    file: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      timestamps: true,
      associate(models) {
        Photo.belongsTo(models.User);
      }
    }
  });

  return Photo;
};
