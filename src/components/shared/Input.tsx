import styles from '../../styles/shared/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  placeholder?: string;
}

const Input = ({ type, id, placeholder, ...props }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
