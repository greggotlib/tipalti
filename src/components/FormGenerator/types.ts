export interface FormField {
  type: string;
  value: any;
  errorMessage: string;
  label: string;
  validator?: (val: any) => boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
  form: FormField[];
}
