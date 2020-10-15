import React from 'react';
import styles2 from './styles/styles2.scss';
import { useLocalization } from './';
import { t, addLocale, useLocale } from 'ttag';

function Comp1() {
  useLocalization();

  return <div className={styles2.some1}>
    {t`Again!!!`}
  </div>;
}

export default Comp1;