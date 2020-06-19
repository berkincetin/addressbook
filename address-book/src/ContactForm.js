import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootsrap/Button';
import * as yup from 'yup';
import { COUNTRIES } from './exports';
import PropTypes from 'prop-types';
import { addContact, editContact, getContacts } from './requests';
import { connect } from 'react-redux';
import { setContacts } from './actionCreators';

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    country: yup.string().required('Country is required').default('Afghanistan'),
    postalCode: yup
        .string()
        .when('country', {
            is: 'United State',
            then: yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
        })
        .when('country', {
            is: 'Canada',
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code'), 
        })
        .required(),
    phone: yup
        .string()
        .when('country', {
            is: country => ["United States","Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber')
        })
        .required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number()
        .required('Age is required')
        .min(0, 'Minimum age is 0')
        .max(200, 'Maximum age is 200'),
});

function ContactForm({
    edit,
    onSave,
    setContacts,
    contact,
    onCancelAdd,
    onCancelEdit
}) {
    const handleSubmit = async (evt) => {
        const isValid = await schema.validate(evt);
    }
}