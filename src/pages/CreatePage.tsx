import styles from '../styles/CreatePage.module.css';
import Input from '../components/shared/Input';

const CreatePage = () => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create new game !</h2>
      <form className={styles.form}>
        <label htmlFor='title'>Title</label>
        <Input type='text' id='title' />
        <label htmlFor='desc'>Description</label>
        <textarea name='desc' id='desc' />
        <label htmlFor='wordList'>Word List</label>
        <div>
          <Input type='text' id='wordList' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default CreatePage;
