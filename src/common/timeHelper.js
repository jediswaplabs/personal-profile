import { formatDistanceToNow } from 'date-fns';
import { enGB, hi } from 'date-fns/locale';

const locales = {
  en: enGB,
  in: hi,
};

const getTimeAgo = (timestamp, locale = 'en') => {
  if (!timestamp) { return ''; }
  try {
    const result = formatDistanceToNow(timestamp, {
      addSuffix: true,
      locale: locales[locale],
    });
    return result;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export { getTimeAgo };
