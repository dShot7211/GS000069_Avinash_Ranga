import React, { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: UseFormReturn<any>;
}

const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;
