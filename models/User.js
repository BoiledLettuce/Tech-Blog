const express = require('express');
const router = express.Router();
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { checkPassword(loginPassword) { return bcrypt.compareSync(loginPassword, this.password); } }

User.init(
    {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },

        username: { type: DataTypes.STRING, allowNull: false },

        user_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'user', key: 'id' } }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);


module.exports = User;