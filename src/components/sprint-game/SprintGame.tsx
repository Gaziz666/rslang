import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './sprint-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';
import {
  sprintGameRandomArray,
  sprintGameShuffledArray,
  sprintGameStatusChange,
  sprintGameTotalPoints,
} from '../../actions/sprint-game-action';
import { RefreshButton } from '../button-icons/refresh-button.tsx/refresh-button';
import { QuestionButton } from '../button-icons/question-button/question-button';
import { CloseButton } from '../button-icons/close-button/close-button';
import { LevelIcon } from '../button-icons/level-icons/level-icons';
import { Timer } from './Timer';
import { TitleGamePage } from '../title-game-page/TitleGamePage';
import { ReactComponent as Cat } from '../../assets/images/cat2.svg';
import { ReactComponent as Timer1 } from '../../assets/images/timer1.svg';
import { ReactComponent as Timer2 } from '../../assets/images/timer2.svg';
import banner from '../../assets/images/sprint-top.png';
import { fetchWordsList } from '../../actions/word-actions';
import Balls from './Balls';


const SprintGame: React.FC = () => {
  const dispatch = useDispatch();

  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const gameStatuses = useSelector(
    (state: RootStateType) => state.sprintGameState
  );

  const {
    gameTitle,
    gameDescription,
    gameStatus,
    totalPoints,
    currentPoints,
    shuffledArray,
    randomArray,
  } = gameStatuses;

  const [wordCounter, setWordCounter] = useState(0);
  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);
  const [wordToGuess, setWordToGuess] = useState('');

  useEffect(() => {
    dispatch(sprintGameTotalPoints(0));
  }, []);

  const createRandomArray = () => {
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(getRandomNumber(20));
    }
    return array;
  };

  useEffect(() => {
    if (wordList.length === 0) {
      dispatch(fetchWordsList({ page: 0, group: 0 }));
    }
    dispatch(sprintGameRandomArray(createRandomArray()));
  }, []);

  useEffect(() => {
    dispatch(
      sprintGameShuffledArray(wordList.slice().sort(() => Math.random() - 0.5))
    );
  }, [wordList]);
  console.log(shuffledArray, 'shuffled');
  console.log(randomArray, 'random');

  // useEffect(() => {
  //   setRandomWord(getRandomNumber(20));
  // }, [wordCounter]);

  const renderTimerPage = () => (
    <div className={`${styles.game__wrapper} ${styles.timer__page}`}>
      <div className={styles.firstWatch__wrapper}>
        <Timer initialTimer={5} nextPage="play" timerFontSize="6.4rem" />
        <Timer1 className={styles.first__timer} />
      </div>
      <p>Приготовьтесь!</p>
      <Cat className={styles.cat__img} />
    </div>
  );

  const checkTheWordRight = () => {
    console.log('here');

    if (shuffledArray[wordCounter].wordTranslate === wordToGuess) {
      dispatch(sprintGameTotalPoints(totalPoints + currentPoints));
    }
    setWordCounter(wordCounter + 1);
  };

  useEffect(() => {
    getRandomNumber(2) === 0
      ? setWordToGuess(shuffledArray[wordCounter].wordTranslate)
      : setWordToGuess(shuffledArray[randomArray[wordCounter]].wordTranslate);
  }, [wordCounter]);

  const checkTheWordWrong = () => {
    if (shuffledArray[wordCounter].wordTranslate !== wordToGuess) {
      dispatch(sprintGameTotalPoints(totalPoints + currentPoints));
    }
    setWordCounter(wordCounter + 1);
  };

  const renderGamePage = () => (
    <div className={`${styles.game__wrapper} ${styles.play}`}>
      <div className={styles.sidebar}>
        <div className={styles.watch__wrapper}>
          <Timer
            initialTimer={60000}
            nextPage="finish"
            timerFontSize="1.8rem"
          />
          <Timer2 className={styles.timer2} />
        </div>
      </div>
      <div
        className={styles.game__field}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.point}>
          <div className={styles.total__points}>{totalPoints}</div>
          <div className={styles.current__points}>
            {currentPoints > 0 ? `+${currentPoints} ` : currentPoints}очков за
            слово
          </div>
        </div>
        <div className={styles.check__points}>circles</div>
        <div className={styles.balls}><Balls/></div>
        <div className={styles.guess__word}>
          <div className={styles.the__word}>
            {shuffledArray[wordCounter].word}
          </div>{' '}
          - 
          <div className={styles.translation}>
            {wordToGuess}
          </div>
        </div>

        <div className={styles.guess_not}> check</div>
        <div className={styles.button__toguess}>
          <button
            type="button"
            className={styles.green__button}
            onClick={checkTheWordRight}
          >
            Верно
          </button>
          <button
            type="button"
            className={styles.red__button}
            onClick={checkTheWordWrong}
          >
            Неверно
          </button>
        </div>
      </div>

      <div className={styles.side__buttons}>
        <RefreshButton buttonClick={() => console.log('click')} />
        <QuestionButton buttonClick={() => console.log('click')} />
        <CloseButton buttonClick={() => console.log('click')} />
      </div>
    </div>
  );

  const renderFinishPage = () => <h1>finish</h1>;
  return (
    <div className={styles.sprint__game}>
      {gameStatus === 'start' ? (
        <TitleGamePage
          gameTitle={gameTitle}
          gameDescription={gameDescription}
          catNumber={2}
          buttonClick={() => dispatch(sprintGameStatusChange('timer'))}
        />
      ) : null}
      {gameStatus === 'timer' ? <div>{renderTimerPage()}</div> : null}
      {gameStatus === 'play' ? <div>{renderGamePage()}</div> : null}
      {gameStatus === 'finish' ? <div>{renderFinishPage()}</div> : null}
    </div>
  );
};

export default SprintGame;
