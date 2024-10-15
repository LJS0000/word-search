import styles from '../styles/CreatePage.module.css';
import Input from '../components/shared/Input';
import Button from '../components/shared/SubmitButton';

const CreatePage = () => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create new game !</h2>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor='title'>Title</label>
          <Input type='text' id='title' />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='desc'>Description</label>
          <textarea className={styles.textarea} id='desc' />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='wordList'>Word List</label>
          <div className={styles.wordList}>
            {[...Array(30)].map((_, index) => (
              <Input key={index} type='text' id={`word-${index}`} />
            ))}
          </div>
        </div>
        <Button>Create</Button>
      </form>
    </div>
  );
};
export default CreatePage;
