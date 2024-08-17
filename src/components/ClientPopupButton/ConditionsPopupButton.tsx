'use client';

import { FC, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import OverlayingPopup from '@/components/popups/OverlayingPopup/OverlayingPopup';
import ConditionsFormPopup from '@/components/popups/ConditionsFormPopup/ConditionsFormPopup';

interface ConditionsFormLayoutProps {
  buttonText: string;
  formTitle?: string;
  submitButtonText: string;
  cancelButtonText: string;
  apiEndpoint: string;
  onFormSubmit?: (formData: any) => void;
  icon?: boolean;
}

const ConditionsPopupButton: FC<ConditionsFormLayoutProps> = ({
  buttonText,
  formTitle,
  submitButtonText,
  cancelButtonText,
  apiEndpoint,
  onFormSubmit,
  icon
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
    setIsModalShown(true);
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setIsModalShown(false);
  };

  const handleSubmit = (formData: any) => {
    setIsModalShown(false);
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <>
      <Button type='button' variant='negative' icon={icon} onClick={handleButtonClick}>
        {buttonText}
      </Button>
      {isModalShown && (
        <OverlayingPopup isOpen={isPopupVisible}>
          <ConditionsFormPopup
            title={formTitle}
            submitButtonText={submitButtonText}
            submitButtonHandler={handleSubmit}
            cancelButtonText={cancelButtonText}
            cancelButtonHandler={handleCancel}
            apiEndpoint={apiEndpoint}
          />
        </OverlayingPopup>
      )}
    </>
  );
};

export default ConditionsPopupButton;
