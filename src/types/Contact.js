import PropTypes from 'prop-types';

export default PropTypes.shape({
  fio: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}).isRequired;
