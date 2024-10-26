import styles from '../../styles/shared/SubmitButton.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
