'use client';

// Import necessary modules and components
import {
    Control,
    FieldValues,
    Controller,
    FieldErrors,
    UseFormSetValue,
} from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import libphonenumber from 'google-libphonenumber';
import { useState } from 'react';

// Define props for the PhoneNumberInput component
interface PhoneInputProps {
    id: string;
    control: Control<FieldValues, any>;
    errors: FieldErrors;
    setValue: UseFormSetValue<FieldValues>;
    isSubmitted: boolean;
    disabled: boolean;
}

// PhoneNumberInput component definition
export default function PhoneNumberInput({
    control,
    id,
    errors,
    setValue,
    isSubmitted,
    disabled,
}: PhoneInputProps) {
    // State to manage phone number data(to manage country code and dial code)
    const [phoneNumberData, setPhoneNumberData] = useState<CountryData>({
        name: 'INDIA',
        dialCode: '+91',
        countryCode: 'in',
        format: '+.. .....-.....',
    });

    // Function to validate the phone number
    const validatePhoneNumber = (
        value: string,
        inputInformation: CountryData
    ) => {
        let isValid = true;
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        const phoneNumber = value.substring(inputInformation.dialCode.length);
        const exampleNumberLengthByCountryCode = phoneUtil //get a example number based on country code to check it
            .getExampleNumber(inputInformation.countryCode) // against the input to validate the length
            .getNationalNumber()
            ?.toString().length;

        if (phoneNumber.length !== exampleNumberLengthByCountryCode)
            return false;
        return isValid;
    };

    // Function to handle onChange event of the phone input
    const handleOnChange = (value: string, inputData: CountryData) => {
        setValue(id, value, { shouldValidate: isSubmitted });
        setPhoneNumberData((prevValue) => inputData);
    };

    return (
        // Use Controller component from react-hook-form
        <Controller
            name={id}
            control={control}
            // Define rules for validation
            rules={{
                required: 'Phone number is required!',
                validate: (fieldValue) => {
                    const isValid = validatePhoneNumber(
                        fieldValue,
                        phoneNumberData
                    );
                    return isValid || 'Phone Number is not valid!';
                },
            }}
            render={({ field }) => {
                return (
                    <div className="flex flex-col">
                        {/* PhoneInput component */}
                        <PhoneInput
                            onChange={(value, inputData) =>
                                handleOnChange(value, inputData as CountryData)
                            }
                            value={field.value}
                            country={phoneNumberData.countryCode}
                            inputStyle={{ width: '100%' }}
                            inputProps={{
                                className: `
                                    form-input
                                    py-3.5
                                    pr-4
                                    pl-[45px]
                                    border-solid
                                    border
                                    rounded-md
                                    text-gray-900
                                    shadow-sm ring-1
                                    ring-inset
                                    sm:text-[1.4rem]
                                    focus:ring-1
                                    focus:ring-inset
                                    focus:ring-emerald-600
                                    ${errors[id] && 'focus:ring-red-500'}
                                    ${disabled && 'opacity-50 cursor-default'}
                                `,
                            }}
                            placeholder="Enter your phone number"
                            enableSearch
                            countryCodeEditable={false}
                            autoFormat
                            disabled={disabled}
                        />
                        {/* Display error message if any */}
                        {errors[id] && errors[id]?.message && (
                            <span className="text-red-500 text-lg mt-1.5">
                                {errors[id]?.message as React.ReactNode}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );
}
