import React, { useState } from 'react';
import { FormProps, FormField } from './types';

const FormGenerator = ({ form }: FormProps) => {
  const [formData, setFormData] = useState<FormField[]>(form);

  //Should be debounced
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index].value = value;
    if (updatedFormData[index].onChange) {
      updatedFormData[index].onChange!(event);
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedFormData = [...formData];
    let isFormValid = true;

    updatedFormData.forEach((field, index) => {
      const { value, validator } = field;
      const isValid = validator ? validator(value) : true;

      if (!isValid) {
        updatedFormData[index].errorMessage = 'Invalid input';
        isFormValid = false;
      } else {
        updatedFormData[index].errorMessage = '';
      }
    });

    setFormData(updatedFormData);

    if (isFormValid) {
      console.log('Form submitted successfully:', updatedFormData);
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
      }}
      onSubmit={handleSubmit}
    >
      {formData.map((field, index) => (
        <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
          <label>{field.label}:</label>
          <input
            style={{
              border: `1px solid ${field.errorMessage ? 'red' : 'black'}`,
            }}
            type={field.type}
            value={field.value}
            onChange={(e) => handleChange(index, e)}
          />
          {field.errorMessage && (
            <div style={{ color: 'red' }}>{field.errorMessage}</div>
          )}
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormGenerator;
