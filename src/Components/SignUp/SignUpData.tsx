import React, { useReducer } from 'react';
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../../Slices/slice';
import { useDispatch } from 'react-redux';
import { AxiosInstance } from '../Services/AxiosInstance';
import { error } from 'console';

// Define the shape of a form field
type FormField ={
  name: string
  type: string
  value: string
  label: string
  required: boolean
  placeholder:string
}

// Define the state shape
type FormState = {
  fields: FormField[]
  errors: { [key: string]: string }
}

// Define action types
type FormAction =
  | { type: 'SET_FIELD_VALUE'; fieldName: string; value: string }
  | { type: 'SET_ERROR'; fieldName: string; error: string }
  | { type: 'CLEAR_ERROR'; fieldName: string }
  | { type: 'RESET_FORM' };

// Initial state
const initialState: FormState = {
  fields: [
    { name: 'firstName', type: 'text', value: '', label: 'First Name', required: true,placeholder:'Enter Your First Name' },
    { name: 'lastName', type: 'text', value: '', label: 'Last Name', required: true,placeholder:'Enter Your Last Name' },
    { name: 'email', type: 'email', value: '', label: 'Email', required: true,placeholder:'Enter Your Email Address' },
    { name: 'Password', type: 'password', value: '', label: 'Password', required: true ,placeholder:'Enter Your Password'},
    { name: 'confirmPassword', type: 'password', value: '', label: 'Confirm Password', required: true,placeholder:'Confirm Your Password Again' },
    { name: 'phone', type: 'number', value: '', label: 'Phone', required: false,placeholder:'Enter Your Phone Number' },
  ],
  errors: {},
};

// Reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        fields: state.fields.map(field =>
          field.name === action.fieldName ? { ...field, value: action.value } : field
        ),
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.fieldName]: action.error },
      };
    case 'CLEAR_ERROR':
      const { [action.fieldName]:_, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        fields: state.fields.map(field => ({ ...field, value: '' })),
      };
    default:
      return state;
  }
};

const SignUp:React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const Rdispatch =useDispatch()

  const Navigate=useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD_VALUE', fieldName: name, value });
    dispatch({ type: 'CLEAR_ERROR', fieldName: name });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    state.fields.forEach(field => {
      if (field.required && !field.value) {
        dispatch({ type: 'SET_ERROR', fieldName: field.name, error: `${field.label} is required` });
        isValid = false;
      }
    });
    
    // Additional validation logic
    const emailField = state.fields.find(f => f.name === 'email');
    if (emailField && emailField.value && !validateEmail(emailField.value)) {
      dispatch({ type: 'SET_ERROR', fieldName: 'email', error: 'Invalid email format' });
      isValid = false;
    }

    const passwordField = state.fields.find(f => f.name === 'Password');
    const confirmPasswordField = state.fields.find(f => f.name === 'confirmPassword');
    if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
      dispatch({ type: 'SET_ERROR', fieldName: 'confirmPassword', error: 'Passwords do not match' });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', state.fields);
      const UserDatas = state.fields.reduce((acc:any,currFields:any)=> {
         acc[currFields.name]=currFields.value 
        return acc }  ,{})
      console.log('UserDatas',UserDatas)
      Rdispatch(setUserData(UserDatas))

      try{
        const response = await AxiosInstance.post<FormField>('/UsersList',UserDatas);
        if(response.data){
          Navigate('/login')
        }
      }catch(err){
        console.error('Error:',err)
        throw new Error('unable to create the user')

      }
      dispatch({ type: 'RESET_FORM' });
      // Navigate('/login')
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <div className="addUser">
            <h3>Sign Up</h3>
    <form className="addUserForm" autoComplete="off" onSubmit={handleSubmit}>
      {state.fields.map(field => (
        <div className="inputGroup" key={field.name} >
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
          />
          {state.errors[field.name] && <p className="error">{state.errors[field.name]}</p>}
        </div>
      ))}
        <div className="login">
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <p>Already have an account ? <Link to='/login' >Login</Link></p>
            </div>
    </form>
    </div>
  );
};

export default SignUp;