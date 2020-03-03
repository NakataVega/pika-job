
exports.up = async function (knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id');

        table.string('email').unique();
        table.string('password');


        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function (knex) {

};
