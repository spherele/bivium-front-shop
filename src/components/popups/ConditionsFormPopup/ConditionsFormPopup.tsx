import { ChangeEvent, FC, FormEvent, useState } from 'react';
import api from '@/api';
import Button from '@/components/ui/Button/Button';
import CrossIcon from '@icons/cross.svg';
import styles from './ConditionsFormPopup.module.css';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Input from '@/components/ui/Input/Input';

interface ConditionsFormProps {
  title?: string;
  cancelButtonText: string;
  cancelButtonHandler: () => void;
  submitButtonText: string;
  submitButtonHandler: (formData: any) => void;
  apiEndpoint: string;
}

interface Errors {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const ConditionsFormPopup: FC<ConditionsFormProps> = ({
  title,
  cancelButtonHandler,
  submitButtonText,
  submitButtonHandler,
  apiEndpoint
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      consent: e.target.checked
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const jsonData = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        page: window.location.pathname
      };

      try {
        const response = await api.post(apiEndpoint, {
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            consent: false
          });
        } else {
          const errorData = await response.json();
          console.error('Failed to submit form:', errorData);
        }
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  const handlePhoneInputClick = () => {
    if (!formData.phone.startsWith('+7')) {
      setFormData({
        ...formData,
        phone: '+7'
      });
    }
  };

  const validateForm = () => {
    const phoneRegex = /^\+7\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    const newErrors: Errors = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };

    // Очищаем предыдущие ошибки
    document.querySelectorAll('input, textarea').forEach(element => {
      element.classList.remove('error');
    });

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите ваше имя';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите вашу фамилию';
      valid = false;
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона в формате +71234567890';
      valid = false;
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты';
      valid = false;
    }

    setErrors(newErrors);

    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof Errors]) {
        document.querySelector(`input[name="${key}"]`)?.classList.add('error');
      }
    });

    return valid;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <button className={styles.closeButton} type='button' onClick={cancelButtonHandler}>
          <CrossIcon />
        </button>
      </div>
      <div className={styles.body}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.firstName && <div className={styles.errorText}>{errors.firstName}</div>}
          <Input name='firstName' placeholder='Имя*' value={formData.firstName} onChange={handleInputChange} />

          {errors.lastName && <div className={styles.errorText}>{errors.lastName}</div>}
          <Input name='lastName' placeholder='Фамилия*' value={formData.lastName} onChange={handleInputChange} />

          <div className={styles.fieldWrapper}>
            {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
            <Input
              className={`${errors.phone ? styles.error : ''}`}
              name='phone'
              type='tel'
              placeholder='Телефон*'
              value={formData.phone}
              onClick={handlePhoneInputClick}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label>
              <div className={styles.email_title}>Email*</div>
              {errors.email && <div className={styles.errorText}>{errors.email}</div>}
              <Input
                className={`${errors.email ? styles.error : ''}`}
                name='email'
                type='email'
                placeholder='example@email.com'
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.required_text}>* поля обязательны для заполнения</div>
          <Button variant='negative' icon={false} type='submit'>
            {submitButtonText}
          </Button>

          <Checkbox
            className={styles.checkbox}
            checked={formData.consent}
            onChange={handleCheckboxChange}
            text='Я даю согласие на обработку персональных данных'
            required
          />
        </form>
      </div>
      {isSubmitted && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Форма успешно отправлена!</h3>
            <p>Мы свяжемся с Вами в ближайшее время</p>
            <Button variant='negative' icon={false} onClick={cancelButtonHandler}>
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionsFormPopup;
