import UAParser from 'ua-parser-js';

const ua = UAParser();
const pixelRatio = ua.os.name === 'iOS' || ua.os.name === 'Android' ? 2 : 1;
export default pixelRatio;
