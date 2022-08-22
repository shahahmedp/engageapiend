/**
 * Seeding data with Sequelize Just like how we use Git
 *  to version control source code, 
 * we use migrations and seeders to manage the state of our database schemas.
 * 
 */

import {v4 as uuidv4} from 'uuid';
export const user=[
    {
        id: uuidv4(),
        firstName: 'shahbaaz',
        lastName: 'ahmed',
        email: "shahbaazcd@gmail.com",
        password: 'abc'
    },
    {
        id: uuidv4(),
        firstName: 'umair',
        lastName: 'ahmed',
        email: "ummu@gmail.com",
        password: 'abc'
    }
]