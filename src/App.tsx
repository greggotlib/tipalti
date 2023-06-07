import './App.css';
import FormGenerator from './components/FormGenerator/FormGenerator';

function App() {
  const fieldArray = [
    {
      type: 'number',
      value: 0,
      errorMessage: '',
      label: 'age',
      validator: (val: number) => val > 0,
    },
    {
      type: 'text',
      value: '',
      errorMessage: '',
      label: 'First name',
      validator: (val: string) => val.length > 0,
    },
    {
      type: 'email',
      value: '',
      errorMessage: '',
      label: 'Email',
      validator: (val: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(val);
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        console.log('email event!!', event.target.value),
    },
  ];

  return <FormGenerator form={fieldArray} />;
}

export default App;
