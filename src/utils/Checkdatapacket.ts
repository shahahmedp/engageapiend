import { body, check, param } from 'express-validator';

export const registerCheck=[
    check('username', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20}),
    body('email', 'invalid email')
        .isEmail().isLength({ min: 10, max: 30 }),
    check(
    "password",
    "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
    ).isLength({ min: 8 }).matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
          ),
    check('roles', 'array of roles should be there')
        .isArray()

];
export const  signInCheck= [
    check('username', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8 })
]
export const companyCheck=[
    check('email', 'invalid email')
                    .isEmail().isLength({ min: 3, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({max: 20 }),
    check('website', 'website length should be 10 to 20 characters')
                    .isLength({ min: 4, max: 20 }),
    check('phone', 'please enter 10 digit number').isLength({ min: 5, max: 10 })
                //.match(/^\d{10}$/)
]
export const employeeCheck=[
    check('email', 'invalid email')
                    .isEmail().isLength({ max: 30 }),
    check('firstName', 'First Name length should be 10 to 20 characters')
                    .isLength({ max: 20 }),
    check('lastName', 'last Name length should be 10 to 20 characters')
                    .isLength({ max: 20 }),
    check('cmp', 'should be string').isString(),
    check('phone', 'please enter 10 digit number').isLength({ min: 5, max: 10 })
                //.match(/^\d{10}$/)
];