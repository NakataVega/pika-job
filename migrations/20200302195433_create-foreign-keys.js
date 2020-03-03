
exports.up = function(knex) {
  
    await knex.schema.table('cursos', table => {
        table.foreign('id_user').references('id').inTable('aspirantes');
    })
};

exports.down = function(knex) {
  
};
