import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocumentToCollection } from '../services/firestoreService';
import styles from '../styles/CreatePage.module.css';
import Input from '../components/shared/Input';
import Button from '../components/shared/SubmitButton';
import Alert from '../components/shared/Alert';

interface AlertState {
  show: boolean;
  text: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const CreatePage = () => {
  const navigate = useNavigate();

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [wordListError, setWordListError] = useState<string | null>(null);

  const [alert, setAlert] = useState<AlertState>({
    show: false,
    text: '',
    type: 'success',
    onClose: undefined,
  });

  const validateForm = ({
    title,
    desc,
    wordList,
  }: {
    title: string;
    desc: string;
    wordList: string[];
  }) => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!desc.trim()) {
      setDescError('Description is required.');
      isValid = false;
    } else {
      setDescError(null);
    }

    if (wordList.length === 0) {
      setWordListError('At least one word is required.');
      isValid = false;
    } else {
      setWordListError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const words = formData.getAll('word') as string[];
    const wordList = words
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word !== '');

    if (!validateForm({ title, desc, wordList })) {
      return;
    }

    const newGameData = {
      title,
      desc,
      wordList,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDocumentToCollection('games', newGameData);
      setAlert({
        show: true,
        text: 'Successfully created new game',
        type: 'success',
        onClose: () => {
          navigate('/');
        },
      });
    } catch (err) {
      console.error('Error creating new game', err);
      setAlert({
        show: true,
        text: 'Error occurred creating new game',
        type: 'error',
        onClose: undefined,
      });
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create new game !</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor='title'>Title</label>
            <Input type='text' name='title' id='title' />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='desc'>Description</label>
            <textarea className={styles.textarea} name='desc' id='desc' />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='wordList'>Word List</label>
            <div className={styles.wordList}>
              {[...Array(30)].map((_, index) => (
                <Input
                  key={index}
                  type='text'
                  name='word'
                  id={`word-${index}`}
                />
              ))}
            </div>
          </div>

          <Button type='submit'>Create</Button>

          <>
            {titleError && (
              <p className={styles.errorMessage}>(!) {titleError}</p>
            )}
            {descError && (
              <p className={styles.errorMessage}>(!) {descError}</p>
            )}
            {wordListError && (
              <p className={styles.errorMessage}>(!) {wordListError}</p>
            )}
          </>
        </form>
      </div>
      {alert.show && (
        <Alert text={alert.text} type={alert.type} onClose={alert.onClose} />
      )}
    </>
  );
};
export default CreatePage;
