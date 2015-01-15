/*
Return user's home directory path.
 */

if (process.env.HOME === undefined) {
    throw new Error ('Please set your HOME directory path as \'$HOME\' into console profile.');
}

module.exports = process.env.HOME;