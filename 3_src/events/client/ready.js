module.exports = async bot => {
    console.log(`${bot.user.username} is online! \nYou are logged in as ${bot.user.tag}`);

    let statuses = [
        'you!'
    ];

    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, { type: "WATCHING" });
    }, 10000)
}