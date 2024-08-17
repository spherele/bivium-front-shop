'use client';

import { FC, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import api from '@/api';

interface ApiResponse {
  message?: string;
  error?: string;
}

const Form: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Введите корректный e-mail');
      return;
    }

    setError('');
    setSuccess(false);

    try {
      const response = await api.post('authorization/recovery-password/', {
        json: { username: email }
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Произошла ошибка при отправке e-mail');
      }
    } catch (error) {
      setError('Произошла ошибка при соединении с сервером');
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>Введите e-mail на который отправить ссылку для смены пароля</div>
        <div className={styles.bodyField}>
          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>Ссылка на восстановление пароля отправлена!</p>}
          <div className={styles.bodyFieldLabel}>E-mail</div>
          <Input
            type='email'
            placeholder='E-Mail'
            value={email}
            required={false}
            onChange={e => setEmail(e.target.value)}
            className={error ? styles.inputError : ''}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button variant='negative' icon={false} type='submit' className={styles.button}>
          Отправить
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
