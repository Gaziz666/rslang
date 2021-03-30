import React from 'react';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { LinkButton } from '../../components/link-button/Link-button';
import { mainPath } from '../../utils/constants';
import styles from './e-book-page.module.css';

const EbookPage: React.FC = () => (
  <div className={styles['ebook-container']}>
    <div className={styles['ebook-buttons-container']}>
      <LinkButton link={mainPath.learnPage} buttonName="Изучение" />
      <LinkButton link={mainPath.dictionaryPage} buttonName="Словарь" />
    </div>
    <div className={styles['ebook-buttons-container']}>
      <LinkButton link={mainPath.ebookPage} buttonName="Определить уровень" />
      <LinkButton link={mainPath.gamePage} buttonName="Мини игры" />
    </div>
    <MainCat />
  </div>
);

export default EbookPage;
