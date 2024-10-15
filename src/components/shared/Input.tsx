import styles from '../../styles/shared/Input.module.css';

const Input = ({
  type,
  id,
  placeholder,
  ...props
}: {
  type: string;
  id: string;
  placeholder?: string;
}) => {
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
