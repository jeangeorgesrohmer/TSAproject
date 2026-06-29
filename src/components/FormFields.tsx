import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { YesNoUnknown, YesNoSometimes } from '../types/form';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
}

interface InputProps extends FormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {}

export const Input: React.FC<InputProps> = ({ label, error, required, helpText, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface TextareaProps extends FormFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {}

export const Textarea: React.FC<TextareaProps> = ({ label, error, required, helpText, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
      <textarea
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y ${
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        rows={4}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface SelectProps extends FormFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, required, helpText, options, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      >
        <option value="">Sélectionnez...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface CheckboxProps extends FormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, helpText, ...props }) => {
  return (
    <div className="mb-4">
      <label className="flex items-start space-x-3 cursor-pointer group">
        <input
          type="checkbox"
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {label}
          </span>
          {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helpText}</p>}
        </div>
      </label>
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface RadioGroupProps extends FormFieldProps {
  name: string;
  value: YesNoUnknown | string;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  required,
  helpText,
  name,
  value,
  onChange,
  options
}) => {
  const defaultOptions = options || [
    { value: 'Oui', label: 'Oui' },
    { value: 'Non', label: 'Non' },
    { value: 'Je ne sais pas', label: 'Je ne sais pas' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
      <div className="flex flex-wrap gap-4">
        {defaultOptions.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-required={required}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

interface RadioGroupSometimesProps extends FormFieldProps {
  name: string;
  value: YesNoSometimes | string;
  onChange: (value: any) => void;
}

export const RadioGroupSometimes: React.FC<RadioGroupSometimesProps> = ({
  label,
  error,
  required,
  helpText,
  name,
  value,
  onChange,
}) => {
  const options = [
    { value: 'Oui', label: 'Oui' },
    { value: 'Parfois', label: 'Parfois' },
    { value: 'Non', label: 'Non' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-required={required}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
