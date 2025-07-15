import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <ErrorContainer>
      <ErrorText>{message}</ErrorText>
      <CloseButton onClick={onDismiss} aria-label="Dismiss error">
        &times;
      </CloseButton>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 12px 16px;
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #c62828;
  font-size: 20px;
  cursor: pointer;
  padding: 0 0 0 16px;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default ErrorMessage;
