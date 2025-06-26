import en from '../resources/messages/en.json';
import fr from '../resources/messages/fr.json';
import jp from '../resources/messages/ja.json';
import kr from '../resources/messages/ko.json';
import vi from '../resources/messages/vi.json';
import zh from '../resources/messages/zh.json';

const messagesByLocale: Record<string, any> = { en, fr, jp, kr, vi, zh };

const nextIntl = {
	defaultLocale: 'en',
	messagesByLocale,
};

export default nextIntl;
