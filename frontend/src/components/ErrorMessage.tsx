import { ReactNode } from 'react';

interface ErrorMessageProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="text-red-500">{children}</p>
  )
}