import React from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd collect form data and send it.
    // For this refactor, we just prevent default and provide a placeholder onSubmit.
    console.log('Contact form submitted');
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-heading font-semibold mb-4">Contact Agent</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField type="text" placeholder="Your Name" />
        <FormField type="email" placeholder="Your Email" />
        <FormField type="tel" placeholder="Your Phone" />
        <FormField type="textarea" rows={4} placeholder="Message (optional)" />
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
        >
          Request Information
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;