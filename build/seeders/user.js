"use strict";
/**
 * Seeding data with Sequelize Just like how we use Git
 *  to version control source code,
 * we use migrations and seeders to manage the state of our database schemas.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const uuid_1 = require("uuid");
exports.user = [
    {
        id: (0, uuid_1.v4)(),
        firstName: 'shahbaaz',
        lastName: 'ahmed',
        email: "shahbaazcd@gmail.com",
        password: 'abc'
    },
    {
        id: (0, uuid_1.v4)(),
        firstName: 'umair',
        lastName: 'ahmed',
        email: "ummu@gmail.com",
        password: 'abc'
    }
];
