import React from 'react'
import { Alert } from 'react-bootstrap'

interface MessageBoxProps {
  variant?: 'danger';
  children: React.ReactNode;
} 

const MessageBox = ({ variant, children }: MessageBoxProps) => {
  return (
    <Alert variant={variant || "info"} >
      { children }
    </Alert>
  )
}

export default MessageBox