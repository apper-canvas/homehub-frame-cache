import React from 'react';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';

const FormField = ({ label, type = 'text', component: Component, ...props }) => {
    const InputComponent = Component || (type === 'textarea' ? Textarea : Input);

    return (
        <div>
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <InputComponent type={type} {...props} />
        </div>
    );
};

export default FormField;