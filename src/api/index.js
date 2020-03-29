import config from '../../config/config';
import Fixture from './Fixtures';
import Api from './Api';

export default config.useFixture ? Fixture : Api;
