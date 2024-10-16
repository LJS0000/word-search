import styles from '../../styles/shared/Toast.module.css';

interface AlertProps {
  text: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const Alert = ({ text, type, onClose }: AlertProps) => {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>{text}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default Alert;
