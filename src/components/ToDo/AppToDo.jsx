import styles from './AppToDo.module.css'  
import { TodoWrapper } from './TodoWrapper';

function ToDo() {
    return (
        <div className={`${styles.App}`}>
            <TodoWrapper />
        </div>
    );
}
export default ToDo;