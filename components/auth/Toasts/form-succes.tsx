import { CheckIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-400">
      <CheckIcon className="h-4 w-4 dark:text-green-400" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
