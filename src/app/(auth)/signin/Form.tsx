'use client';

import { FC, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import styles from './Form.module.css';

import ky, { HTTPError } from 'ky';
import { IUser } from '@/models';

import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/userSlice';

import Link from 'next/link';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

interface IForm {
  email: string;
  password: string;
}

interface IFormMessage {
  text: string;
  color?: 'green' | 'red';
}

const Form: FC = () => {
  const router = useRouter();
  const dipatch = useAppDispatch();

  const [messages, setMessages] = useState<IFormMessage[]>([]);
  const { handleSubmit, register } = useForm<IForm>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      const user = await ky
        .post('/next-api/auth/signin', {
          json: {
            username: data.email,
            password: data.password
          }
        })
        .json<IUser>();

      setMessages([]);
      dipatch(setUser(user));

      router.push('/personal');
    } catch (error: unknown) {
      setMessages([{ text: await (error as HTTPError).response.json(), color: 'red' }]);
    }
  };

  const onInvalid: SubmitErrorHandler<IForm> = errors => {
    setMessages(() => {
      const messages: IFormMessage[] = [];

      errors?.email?.message && messages.push({ text: errors!.email!.message!, color: 'red' });
      errors?.password?.message && messages.push({ text: errors!.password!.message!, color: 'red' });

      return messages;
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {!!messages.length && (
        <div className={styles.messages}>
          {messages.map((message, messageIndex) => (
            <div key={messageIndex} className={classNames(styles.messagesItem, message.color && styles[message.color])}>
              {message.text}
            </div>
          ))}
        </div>
      )}
      <div className={styles.body}>
        <Input
          type='email'
          placeholder='E-Mail'
          {...register('email', { required: "Поле 'E-Mail' обязательно к заполнению." })}
        />
        <Input
          type='password'
          placeholder='Пароль'
          {...register('password', { required: "Поле 'Пароль' обязательно к заполнению." })}
        />
        <Link className={styles.link} href='/password-recovery'>
          Забыли пароль?
        </Link>
      </div>
      <div className={styles.footer}>
        <Button variant='negative' icon={false} type='submit' className={styles.button}>
          Войти
        </Button>
        <p className={styles.signupText}>У Вас ещё нет профиля? Зарегистрируйтесь сейчас!</p>
        <Button
          variant='default'
          icon={false}
          type='button'
          className={styles.button}
          onClick={() => router.push('/signup')}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};

export default Form;
