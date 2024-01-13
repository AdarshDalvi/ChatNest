import { FieldValues } from 'react-hook-form';

type CustomValidateFunction = (fieldValue: FieldValues) => true | string;

type CustomValidationRulesObject = {
    [key: string]: CustomValidateFunction;
};

type CustomValidationParam =
    | CustomValidateFunction
    | CustomValidationRulesObject;

interface GenerateSchemaParameters {
    fieldName: string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: CustomValidationParam;
}

function generateSchema({
    fieldName = 'This field',
    minLength,
    maxLength,
    pattern,
    validate,
}: GenerateSchemaParameters) {
    let schema: { required: { value: boolean; message: string } } & {
        [key: string]: any;
    } = {
        required: {
            value: true,
            message: `${fieldName} cannot be empty!`,
        },
    };

    if (minLength) {
        schema['minLength'] = {
            value: minLength,
            message: `Please enter a minimum of ${minLength} characters!`,
        };
    }
    if (maxLength) {
        schema['maxLength'] = {
            value: maxLength,
            message: `${fieldName} cannot have more than ${maxLength} characters!`,
        };
    }
    if (pattern) {
        schema['pattern'] = {
            value: pattern,
            message: `${fieldName} is not valid!`,
        };
    }
    if (validate) {
        schema['validate'] = validate;
    }

    return schema;
}

// class ValidationSchema {
//     fieldName: string;
//     constructor(fName?: string) {
//         this.fieldName = fName || 'This field';
//     }

// }

export default generateSchema;
