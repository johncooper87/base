import React from 'react';
import styles2 from './styles/styles2.scss';
import { useLocalization } from './';
import { jt } from 'ttag';

function Comp1() {
  useLocalization();

  return <div className={styles2.some1}>
    {jt`Again!!!`}
  </div>;
}

export default Comp1;