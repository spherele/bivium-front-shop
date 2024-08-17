'use client';

import React, { FC, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import classNames from 'classnames';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ky, { HTTPError } from 'ky';

import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/userSlice';
import { IUser } from '@/models';

import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';

import styles from './Form.module.css';

interface IFormMessage {
  text: string;
  color?: 'green' | 'red';
}

interface IForm {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  password: string;
  password_confirmation: string;
  personalDataProcessingConsent: boolean;
}

const Form: FC = () => {
  const router = useRouter();
  const dipatch = useAppDispatch();

  const [messages, setMessages] = useState<IFormMessage[]>([]);
  const { handleSubmit, register, watch } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      const preparedData = { ...data } as Partial<IForm>;
      delete preparedData.personalDataProcessingConsent;

      const user = await ky
        .post('/next-api/auth/signup', {
          json: preparedData
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

      errors?.name?.message && messages.push({ text: errors!.name!.message!, color: 'red' });
      errors?.email?.message && messages.push({ text: errors!.email!.message!, color: 'red' });
      errors?.password?.message && messages.push({ text: errors!.password!.message!, color: 'red' });
      errors?.password_confirmation?.message &&
        messages.push({ text: errors!.password_confirmation!.message!, color: 'red' });
      errors?.personalDataProcessingConsent?.message &&
        messages.push({ text: errors!.personalDataProcessingConsent!.message!, color: 'red' });

      return messages;
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className={styles.body}>
        {!!messages.length && (
          <div className={styles.messages}>
            {messages.map((message, messageIndex) => (
              <div
                key={messageIndex}
                className={classNames(styles.messagesItem, message.color && styles[message.color])}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
        <Input
          type='text'
          placeholder='Имя*'
          {...register('name', { required: "Поле 'Имя' обязательно к заполнению." })}
        />
        <Input type='text' placeholder='Фамилия' {...register('surname')} />
        <Input type='text' placeholder='Отчество' {...register('patronymic')} />

        <Input
          type='email'
          placeholder='E-Mail*'
          {...register('email', { required: "Поле 'E-Mail' обязательно к заполнению." })}
        />

        <Input
          type='password'
          placeholder='Пароль*'
          {...register('password', { required: "Поле 'Пароль' обязательно к заполнению." })}
        />
        <Input
          type='password'
          placeholder='Подтверждение пароля*'
          {...register('password_confirmation', {
            required: "Поле 'Подтверждение пароля' обязательно к заполнению.",
            validate: value => value === watch('password') || "Поле 'Подтверждение пароля' заполнено неправильно."
          })}
        />
        <div className={styles.required_text}>*поля обязательны для заполнения</div>

        <Button className={styles.button} variant='negative' icon={false} type='submit'>
          Зарегистрироваться
        </Button>
        <Checkbox
          className={styles.checkbox}
          text='Я даю согласие на обработку персональных данных'
          {...register('personalDataProcessingConsent', { required: 'Согласитесь с обработкой персональных данных.' })}
        />
        <Link className={styles.link} href='/signin'>
          Уже есть аккаунт?
        </Link>
      </div>
    </form>
  );
};

export default Form;
