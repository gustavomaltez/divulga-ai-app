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
  email?: string;
  password?: string;
};

// Component -------------------------------------------------------------------

export function LoginScreen(): JSX.Element {
  const [errors, setErrors] = useState<Errors>({});

  function getFormData(form: HTMLFormElement) {
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    return { email, password };
  }

  function handleInvalidData({ inner: errors }: any) {
    const newErrors: Errors = {};
    for (const error of errors) {
      const path = error.path as keyof Errors;
      newErrors[path] = error.message;
    }
    setErrors(newErrors);
    toast.error('Opa! Parece que você precisa checar os seus dados.');
  }

  async function authenticate(email: string, password: string) {
    try {
      await authenticationManager.login(email, password);
      toast.success('Usuário autenticado com sucesso!');
    } catch (error: any) {
      if (error.response.status === 400)
        toast.error('Credenciais inválidas! Verifique seu email e senha.');
      else
        toast.error('Ops! Parece que algo deu errado, tente novamente em alguns instantes.');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const { email, password } = getFormData(event.target as HTMLFormElement);

    const schema = yup.object().shape({
      email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
      password: yup.string().required('Senha obrigatória'),
    });

    try {
      await schema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      authenticate(email as string, password as string);
    } catch (err: any) {
      handleInvalidData(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto bg-gray-800 rounded-xl p-8 w-[90vw] max-w-xl absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4'
    >
      <img className='w-20 h-20 mb-8 mx-auto' src={logo} alt='logo' />
      <div className='flex flex-col items-center justify-center mb-4'>
        <h1 className='text-3xl text-white font-bold'>Bem Vindo!</h1>
        <h1 className='text-base text-gray-400 font-medium'>
          Conquiste mais clientes online e inpulse seu negócio!
        </h1>
      </div>
      <Input
        label="E-mail"
        type="text"
        name="email"
        error={errors.email}
      />
      <Input
        label="Senha"
        type="password"
        name="password"
        error={errors.password}
      />
      <Button
        label="Entrar"
        theme='primary'
      />
      <div className='text-gray-400 mt-2'>
        {'Não possui uma conta? '}
        <Link to='/register' className='text-primary-500 font-medium'>Cadastre-se</Link>
        {' ou '}
        <Link to='/search' className='text-primary-500 font-medium'>Busque por anúncios</Link>
      </div>
    </form>
  );
}