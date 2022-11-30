/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from '@components';
import { logo } from '@images';
import { authenticationManager } from '@services';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// Types -----------------------------------------------------------------------

type Errors = {
  whatsapp?: string;
  email?: string;
  password?: string;
};

// Component -------------------------------------------------------------------

export function RegisterScreen(): JSX.Element {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function getFormData(form: HTMLFormElement) {
    const formData = new FormData(form);
    const whatsapp = formData.get('whatsapp');
    const email = formData.get('email');
    const password = formData.get('password');
    return { whatsapp, email, password };
  }

  function handleInvalidData({ inner: errors }: any) {
    const newErrors: Errors = {};
    for (const error of errors) {
      const path = error.path as keyof Errors;
      newErrors[path] = error.message;
    }
    setErrors(newErrors);
    toast.error('Ops! Seems like you need to check your data.');
  }

  async function register(whatsapp: string, email: string, password: string) {
    try {
      await authenticationManager.register(whatsapp, email, password);
      toast.success('User created successfully!');
    } catch (error: any) {
      if (error.response.status === 400)
        toast.error('E-mail inválido! Já existe um usuário com esse e-mail.');
      else
        toast.error('Ops! Parece que algo deu errado, tente novamente em alguns instantes.');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const { whatsapp, email, password } = getFormData(event.target as HTMLFormElement);

    const schema = yup.object().shape({
      whatsapp: yup.string().min(14, 'O whatsapp deve seguir o padrão +551123456789').required('Whatsapp obrigatório'),
      email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
      password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória'),
    });

    try {
      await schema.validate({ whatsapp, email, password }, { abortEarly: false });
      setErrors({});
      register(whatsapp as string, email as string, password as string);
    } catch (err: any) {
      handleInvalidData(err);
    }
  }

  function formatPhone(phone: string) {
    const phoneRegex = /^\(?(\d{2})\)?[- ]?(\d{5})[- ]?(\d{4})$/;
    const phoneFormatted = phone.replace(phoneRegex, '+55$1$2$3');
    setPhone(phoneFormatted);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=' mx-auto bg-gray-800 rounded-xl p-8 w-[90vw] max-w-xl absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4'
    >
      <img className='w-20 h-20 mb-8 mx-auto' src={logo} alt='logo' />
      <div className='flex flex-col items-center justify-center mb-4'>
        <h1 className='text-3xl text-white font-bold'>Criar Conta</h1>
        <h1 className='text-base text-gray-400 font-medium'>
          Cadastre-se e conquiste clientes!
        </h1>
      </div>
      <Input
        label='Whatsapp'
        name='whatsapp'
        type='text'
        maxLength={14}
        onChange={e => formatPhone(e.target.value)}
        value={phone}
        error={errors.whatsapp}
      />
      <Input
        label="E-mail"
        type="text"
        name="email"
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        error={errors.password}
      />
      <Button
        label="Register"
        theme='primary'
      />
      <div className='text-gray-400 mt-2'>
        {'Você também pode '}
        <Link to='/login' className='text-primary-500 font-medium'>Entrar</Link>
        {' ou '}
        <Link to='/search' className='text-primary-500 font-medium'>Buscar por anúncios</Link>
      </div>
    </form>
  );
}