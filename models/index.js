const Forum = require('./Forum');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Forum, { foreignKey: 'user_id' } );
User.hasMany(Comment, { foreignKey: 'user_id' } );
Forum.belongsTo(User, { foreignKey: 'user_id' } );
Forum.hasMany(Comment, { foreignKey: 'album_id' } );
Comment.belongsTo(User, { foreignKey: 'user_id' } );
Comment.belongsTo(Forum, { foreignKey: 'forum_id' } );

module.exports = { User, Forum, Comment };