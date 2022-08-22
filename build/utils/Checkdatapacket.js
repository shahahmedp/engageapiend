"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeCheck = exports.companyCheck = exports.signInCheck = exports.registerCheck = void 0;
const express_validator_1 = require("express-validator");
exports.registerCheck = [
    (0, express_validator_1.check)('username', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20 }),
    (0, express_validator_1.body)('email', 'invalid email')
        .isEmail().isLength({ min: 10, max: 30 }),
    (0, express_validator_1.check)("password", "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ").isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    (0, express_validator_1.check)('roles', 'array of roles should be there')
        .isArray()
];
exports.signInCheck = [
    (0, express_validator_1.check)('username', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20 }),
    (0, express_validator_1.check)('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8 })
];
exports.companyCheck = [
    (0, express_validator_1.check)('email', 'invalid email')
        .isEmail().isLength({ min: 3, max: 30 }),
    (0, express_validator_1.check)('name', 'Name length should be 10 to 20 characters')
        .isLength({ max: 20 }),
    (0, express_validator_1.check)('website', 'website length should be 10 to 20 characters')
        .isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)('phone', 'please enter 10 digit number').isLength({ min: 5, max: 10 })
    //.match(/^\d{10}$/)
];
exports.employeeCheck = [
    (0, express_validator_1.check)('email', 'invalid email')
        .isEmail().isLength({ max: 30 }),
    (0, express_validator_1.check)('firstName', 'First Name length should be 10 to 20 characters')
        .isLength({ max: 20 }),
    (0, express_validator_1.check)('lastName', 'last Name length should be 10 to 20 characters')
        .isLength({ max: 20 }),
    (0, express_validator_1.check)('cmp', 'should be string').isString(),
    (0, express_validator_1.check)('phone', 'please enter 10 digit number').isLength({ min: 5, max: 10 })
    //.match(/^\d{10}$/)
];
