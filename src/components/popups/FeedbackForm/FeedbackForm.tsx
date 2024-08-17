import React, { FC, useState, useRef, FormEvent, ChangeEvent } from 'react';
import api from '@/api';
import Button from '@/components/ui/Button/Button';
import CrossIcon from '@icons/cross.svg';
import styles from './FeedbackForm.module.css';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Input from '@/components/ui/Input/Input';
import TextArea from '@/components/ui/TextArea/TextArea';

interface FeedbackFormPopupProps {
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
  socialLinks: string;
  phone: string;
  email: string;
  about: string;
}

const FeedbackFormPopup: FC<FeedbackFormPopupProps> = ({
  title,
  cancelButtonHandler,
  submitButtonText,
  submitButtonHandler,
  apiEndpoint
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    socialLinks: '',
    phone: '',
    email: '',
    about: '',
    consent: false,
    file: null as { name: string; value: string } | null
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    socialLinks: '',
    phone: '',
    email: '',
    about: ''
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        setFormData({
          ...formData,
          file: { name: file.name, value: base64String || '' }
        });
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setFormData({
      ...formData,
      file: null
    });
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const jsonData = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        socialNetworks: formData.socialLinks,
        message: formData.about,
        page: window.location.pathname,
        file: formData.file
      };

      console.log('Отправка данных:', jsonData);

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
            socialLinks: '',
            phone: '',
            email: '',
            about: '',
            consent: false,
            file: null
          });
          setFileName(null);
        } else {
          const errorData = await response.json();
          console.error('Failed to submit form:', errorData);
        }
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
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
      socialLinks: '',
      phone: '',
      email: '',
      about: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите ваше имя';
      document.querySelector('input[name="firstName"]')?.classList.add('error');
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите вашу фамилию';
      document.querySelector('input[name="lastName"]')?.classList.add('error');
      valid = false;
    }

    if (!formData.socialLinks.trim()) {
      newErrors.socialLinks = 'Введите ссылку на соцсети';
      document.querySelector('input[name="socialLinks"]')?.classList.add('error');
      valid = false;
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона в формате +71234567890';
      document.querySelector('input[name="phone"]')?.classList.add('error');
      valid = false;
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты';
      document.querySelector('input[name="email"]')?.classList.add('error');
      valid = false;
    }

    setErrors(newErrors);
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
          <div className={styles.fieldWrapper}>
            {errors.firstName && <div className={styles.errorText}>{errors.firstName}</div>}
            <Input name='firstName' placeholder='Имя*' value={formData.firstName} onChange={handleInputChange} />
          </div>

          <div className={styles.fieldWrapper}>
            {errors.lastName && <div className={styles.errorText}>{errors.lastName}</div>}
            <Input name='lastName' placeholder='Фамилия*' value={formData.lastName} onChange={handleInputChange} />
          </div>

          <div className={styles.fieldWrapper}>
            {errors.socialLinks && <div className={styles.errorText}>{errors.socialLinks}</div>}
            <Input
              name='socialLinks'
              placeholder='Ссылки на соцсети*'
              value={formData.socialLinks}
              onChange={handleInputChange}
            />
          </div>

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

          <TextArea name='about' placeholder='Немного о себе' value={formData.about} onChange={handleInputChange} />
          {errors.about && <div className={styles.errorText}>{errors.about}</div>}

          <div className={styles.required_text}>* поля обязательны для заполнения</div>

          {fileName ? (
            <div className={styles.fileWrapper}>
              <div className={styles.fileName} onClick={handleFileClick}>
                {fileName}
              </div>
              <button className={styles.removeButton} type='button' onClick={handleFileRemove}>
                <CrossIcon />
              </button>
            </div>
          ) : (
            <a href='#' className={styles.formAttachFile} onClick={handleFileClick}>
              Прикрепить файл
            </a>
          )}
          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

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

export default FeedbackFormPopup;
