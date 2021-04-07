import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWordsList } from '../../actions/aggregated-word-action';
import {
  getTodayStatistic,
  getTotalStatistics,
  setStatistics,
} from '../../actions/statistic-action';
import {
  addUserWord,
  getUserWord,
  getUserWordList,
  removeUserWord,
  userWordDeleted,
  userWordToEasy,
  userWordToHard,
  userWordToLearnResult,
  userWordUnDeleted,
} from '../../actions/user-words-action';
import {
  fetchWordsList,
  gameStartStatusChange,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { filterQuery } from '../../services/word-aggregate-service';
import { difficulty, GameStart, gameType } from '../../utils/constants';

export const GameTest: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const gameStatistic = useSelector(
    (state: RootStateType) => state.statisticState.optional.gameStatistic
  );
  const wordList = useSelector((state: RootStateType) => state.wordState);
  // state for game start
  const gameStatus = useSelector(
    (state: RootStateType) => state.wordState.gameStart
  );
  const userWordList = useSelector(
    (state: RootStateType) =>
      state.aggregatedWordsState.userAggregatedWords.paginatedResults
  );

  const userWordState = useSelector(
    (state: RootStateType) => state.userWordsState
  );
  const dispatch = useDispatch();
  const getStat = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };

    dispatch(getTodayStatistic(param));
  };
  const getWordList = () => {
    dispatch(fetchWordsList({ page: 1, group: 2 }));
  };

  const getTotalStat = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };

    dispatch(getTotalStatistics(param));
  };

  const sendStat = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };
    const body = {
      gameType: gameType.savanna,
      know: 5,
      dont_know: 3,
      combo: 2,
      wordsId: ['1', '2', '3', '4', '5'],
    };

    dispatch(setStatistics(param, body));
  };

  const addwordToState = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    dispatch(addUserWord(params));
  };

  const getWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };

    dispatch(getUserWord(param));
  };

  const deleteWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };

    dispatch(removeUserWord(param));
  };

  const getUserAllWord = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };

    dispatch(getUserWordList(param));
  };

  // /----------------
  // update user word word
  //  -----------------

  const toDeleted = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    dispatch(userWordDeleted(params));
  };

  const toUnDeleted = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    dispatch(userWordUnDeleted(params));
  };

  const toHard = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    dispatch(userWordToHard(params));
  };

  const toEasy = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    dispatch(userWordToEasy(params));
  };

  const toLearning = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    // dispatch(userWordToLearning(params));
  };

  const toUnLearning = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    // dispatch(userWordToUnLearning(params));
  };

  const addGameResult = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[3].id,
      token: user.token,
    };
    const gameResult = {
      isCorrect: true,
    };
    dispatch(userWordToLearnResult(params, gameResult));
  };

  // aggregate buttons
  //  const filterQuery = {
  //   deletedWord: 'deleted',
  //   allWords: 'all',
  //   hardWords: 'hard',
  //   easyAndWithoutTypesWords: 'easy',
  //   learnedWordsAndHardWords: 'learned',
  // };

  const getAggregateAll = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 1, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.allWords));
  };

  const getAggregatedelete = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.deletedWord));
  };

  const getAggregateEasy = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(
      getAggregatedWordsList(params, filterQuery.easyAndWithoutTypesWords)
    );
  };

  const getAggregateHard = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.hardWords));
  };

  const getAggregateLearning = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(
      getAggregatedWordsList(params, filterQuery.learnedWordsAndHardWords)
    );
  };

  // ------------------
  // game status change
  // =======================

  const gameStatusChange = () => {
    dispatch(gameStartStatusChange(GameStart.Book));
  };
  // const renderSavanaStatistic = () => {
  //   if (gameStatistic.savanna) {
  //     return gameStatistic.savanna.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };
  // const renderAudiocallStatistic = () => {
  //   if (gameStatistic.audiocall) {
  //     return gameStatistic.audiocall.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };

  // const renderConstructorsStatistic = () => {
  //   if (gameStatistic.constructors) {
  //     return gameStatistic.constructors.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };

  const renderSprintStatistic = () => {
    if (gameStatistic.sprint) {
      return gameStatistic.sprint.total.map((item) => (
        <div key={item.date!.toString()}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <input type="button" value="send stat" onClick={getWordList} />
      <div>game test</div>
      <input type="button" value="send stat" onClick={sendStat} />
      <input type="button" value="get stat" onClick={getStat} />
      <input type="button" value="get total stat" onClick={getTotalStat} />
      <h3>savanna</h3>
      <input type="button" value="add word to back" onClick={addwordToState} />
      <input type="button" value="get word to state" onClick={getWordToState} />

      <input
        type="button"
        value="delete word from back"
        onClick={deleteWordToState}
      />
      <input
        type="button"
        value="get userList words"
        onClick={getUserAllWord}
      />
      <h3>update word</h3>
      <input type="button" value="update delete" onClick={toDeleted} />
      <input type="button" value="update unDelete" onClick={toUnDeleted} />
      <input type="button" value="update toHard" onClick={toHard} />
      <input type="button" value="update toEasy" onClick={toEasy} />
      <input type="button" value="update toLearning" onClick={toLearning} />
      <input type="button" value="update toUnLearning" onClick={toUnLearning} />

      <input
        type="button"
        value="update toUnLearning"
        onClick={addGameResult}
      />
      <h3>Aggregate</h3>
      <div>
        <input type="button" value="get all" onClick={getAggregateAll} />
      </div>
      <div>
        <input type="button" value="get delete" onClick={getAggregatedelete} />
      </div>

      <div>
        <input type="button" value="get easy" onClick={getAggregateEasy} />
      </div>

      <div>
        <input type="button" value="get hard" onClick={getAggregateHard} />
      </div>

      <div>
        <input
          type="button"
          value="get learning"
          onClick={getAggregateLearning}
        />
      </div>

      <h3>game status change</h3>
      <div>
        <input
          type="button"
          value="game status change"
          onClick={gameStatusChange}
        />
      </div>

      {/* <div>{renderSavanaStatistic()}</div>
      <h3>sprint</h3>
      <div>{renderSprintStatistic()}</div>
      <h3>audiocall</h3>
      <div>{renderAudiocallStatistic()}</div>
      <h3>constructors</h3>
      <div>{renderConstructorsStatistic()}</div> */}
    </div>
  );
};
