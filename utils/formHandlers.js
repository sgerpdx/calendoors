const handleStateChange = (e, setStateFunction) => {
  e.preventDefault();
  const newState = e.target.value;
  setStateFunction(newState);
};

const handleEmailChange = (e) => {
  e.preventDefault();
  const newEmail = e.target.value;
  setUEmail(newEmail);
};

const handlePasswordChange = (e) => {
  e.preventDefault();
  const newPassword = e.target.value;
  setUPassword(newPassword);
};

module.exports = {
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
};
