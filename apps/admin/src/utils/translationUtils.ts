import { TFunction } from 'i18next';

const translateRelativeTime = (relativeTime: string | null, t: TFunction) => {
  let result = relativeTime;

  if (!result) {
    return result;
  }

  // Replace x time ago with translated version
  result = result.replace('months ago', t('months ago'));

  result = result.replace('weeks ago', t('weeks ago'));

  result = result.replace('days ago', t('days ago'));

  result = result.replace('hours ago', t('hours ago'));

  result = result.replace('minutes ago', t('minutes ago'));

  result = result.replace('seconds ago', t('seconds ago'));

  return result;
};

export default translateRelativeTime;
