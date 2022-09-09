const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Forum extends Model {}

Forum.init(
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.INTEGER, references: { model: 'user', key: 'id' } },
        forum_content: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'forum'
    }
);

module.exports = Forum;