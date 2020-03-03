
exports.up = async function (knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
        table.integer('id_aspirante').unsigned().notNullable();
        table.integer('id_organizacion').unsigned().notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('aspirantes', table => {
        table.increments('id');
        table.string('apellido_paterno');
        table.string('apellido_materno');
        table.string('nombre');
        table.string('carrera');
        table.date('fecha_naci');
        table.string('ciudad_naci');
        table.string('estado_naci');
        table.string('pais_naci');
        table.string('ciudad_resi');
        table.string('estado_resi');
        table.string('pais_resi');
        table.string('telefono1');
        table.string('telefono2');
        table.text('descripcion');
        table.text('conocimientos');
        table.text('referencias');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('cursos', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('nombre_curso');
        table.string('institucion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.integer('duracion');
        table.string('descripcion');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('experiencias_laborales', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('titulo_expe');
        table.string('organizacion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.text('actividades');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('formaciones_academicas', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('titulo_formacion');
        table.string('institucion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.integer('certificado');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('idiomas', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('idioma');
        table.float('porcentaje');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('organizaciones', table => {
        table.increments('id');
        table.string('nombre_orga');
        table.string('rfc');
        table.text('domicilio');
        table.text('descripcion');
        table.string('nombre_reclutador');
        table.string('correo_reclutador');
        table.string('password');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('vacantes', table => {
        table.increments('id');
        table.integer('id_organizacion').unsigned().notNullable();
        table.foreign('id_organizacion').references('id').inTable('organizaciones');
        table.integer('activo');
        table.string('nombre_vacante');
        table.text('horario');
        table.float('sueldo');
        table.text('descripcion');
        table.string('escolaridad');
        table.text('requisitos0');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    await knex.schema.createTable('postulaciones', table => {
        table.increments('id');
        table.integer('id_aspirante').unsigned().notNullable();
        table.foreign('id_aspirante').references('id').inTable('aspirantes');
        table.integer('id_vacante').unsigned().notNullable();
        table.foreign('id_vacante').references('id').inTable('vacantes');
        table.date('fecha_postu');
        table.integer('status');
        table.text('nota');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

    return knex.schema.table('users', table => {
        table.foreign('id_organizacion').references('id').inTable('organizaciones');
        table.foreign('id_aspirante').references('id').inTable('aspirantes');
    });
};

exports.down = function (knex) {

};
