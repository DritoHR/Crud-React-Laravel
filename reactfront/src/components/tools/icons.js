import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon({ icon, ...props }) {
  return <FontAwesomeIcon icon={icon} {...props} />;
}

export default Icon;