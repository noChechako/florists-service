import {User} from "../models";

/**
 * Make any changes you need to make to the database here
 */

export async function up() {
    await User.create({
        email: 'admin@mail.ru',
        password: '123456',
        username: 'admin',
        role: 'ADMIN'
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
    await User.deleteOne({
        username: 'admin'
    })
}
