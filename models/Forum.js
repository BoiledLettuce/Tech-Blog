const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Forum extends Model {}

Forum.init(
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        forum_content: { type: DataTypes.TEXT, allowNull: true },
        user_id: { type: DataTypes.INTEGER, references: { model: 'user', key: 'id' } }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Forum'
    }
);

module.exports = Forum;