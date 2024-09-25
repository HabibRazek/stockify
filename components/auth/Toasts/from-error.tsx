import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}


const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-100/15 p-3 rounded-md flex items-center gap-x-2 bg-red-100 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-400">
      <ExclamationTriangleIcon className="h-4 w-4 dark:text-red-400" />
      <p>{message}</p>
    </div>
  )
}

export default FormError
