import styles from '../../styles/Board.module.css';

const Board = ({ rows = 12, cols = 14 }: { rows?: number; cols?: number }) => {
  return (
    <div className={styles.board}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={styles.row}>
          {Array.from({ length: cols }, (_, j) => (
            <div key={j} className={styles.cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
