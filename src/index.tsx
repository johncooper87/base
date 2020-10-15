import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles1 from './styles1.css';
import { t, addLocale, useLocale } from 'ttag';
import { useUpdate } from './internals/react-update-hook';

const localizationSubscribers = new Set<() => void>();

export function useLocalization() {
  const update = useUpdate();
  useEffect(() => {
    localizationSubscribers.add(update);
    return () => localizationSubscribers.delete(update);
  }, []);
}

// async function i18nInit() {
//   const lang = localStorage.getItem('lang');
//   if (lang === 'ru') {
//     //@ts-ignore
//     const locale = await import('../i18n/ru.po.json');
//     console.log(locale.default);
//     addLocale(lang, locale.default);
//     useLocale(lang);
//   }
// }

// i18nInit();

// function switchLang(lang: string) {
//   localStorage.setItem('lang', lang);
//   window.location.reload();
// }

async function switchLang(lang: string) {
  if (lang === 'ru') {
    //@ts-ignore
    const locale = await import('./i18n/ru.po');
    console.log(locale.default);
    addLocale(lang, locale.default);
    useLocale(lang);
  }
  if (lang === 'en') {
    useLocale(lang);
  }
  for (const invokeUdater of localizationSubscribers) invokeUdater();
}

// function wait(ms) {
//   return new Promise(
//     resolve => {
//       setTimeout(
//         () => resolve(),
//         ms
//       );
//     }
//   );
// }

// const Comp1 = lazy(async () => {
//   await wait(2000);
//   return import('./Comp1');
// });

const Comp1 = lazy(() => import('./Comp1'));

// function aaa() {
//   const b = 5;
//   return 2;
// }

// aaa();

function App() {

  useLocalization();

  console.log('App');
  const a = 5;

  const [showComp1, setShowComp1] = useState(false);

  return <div className={styles1.root1}>
    <div>
      <button onClick={() => switchLang('ru')}>ru</button>
      <button onClick={() => switchLang('en')}>en</button>
    </div>
    {t`Hello World!`}
    <div>
      <button onClick={() => setShowComp1(show => !show)}>{t`show comp1`}</button>
    </div>
    <Suspense fallback={<div>{t`loading ...`}</div>}>
      {showComp1 && <Comp1 />}
    </Suspense>
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);