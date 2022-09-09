const User = require('./User');

const Forum = require('./Forum');

const Comment = require('./Comment'); 

User.hasMany(Forum, { foreignKey: 'user_id', onDelete: 'SET NULL' } );
User.hasMany(Comment, { foreignKey: 'user_id' } );
Forum.belongsTo(User, { foreignKey: 'user_id' } );
Forum.hasMany(Comment, { foreignKey: 'forum_id' } );
Comment.belongsTo(User, { foreignKey: 'user_id' } );
Comment.belongsTo(Forum, { foreignKey: 'forum_id' } );

module.exports = { 
    User, 
    Forum, 
    Comment,
};