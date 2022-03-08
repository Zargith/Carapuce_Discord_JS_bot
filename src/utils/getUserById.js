module.exports = async function(userId) {
    return await bot.users.fetch(userId, { force: true });
};