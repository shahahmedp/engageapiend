"use strict";
/**
 * Seeding data with Sequelize Just like how we use Git
 *  to version control source code,
 * we use migrations and seeders to manage the state of our database schemas.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
exports.role = [
    {
        role: 'Admin',
        status: 'Active'
    },
    {
        role: 'Company',
        status: 'Active'
    }, {
        role: 'user',
        status: 'Active'
    }
];
