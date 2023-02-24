const User = require('../entity/user');

exports.fromModelToEntity = ({
  id,
  user,
  pass,
  phone,
  firstName,
  lastName,
  country,
  subtitle,
  photo,
  bio,
  createdAt,
  updatedAt,
}) => new User(
  id,
  user,
  pass,
  phone,
  firstName,
  lastName,
  country,
  subtitle,
  photo,
  bio,
  createdAt,
  updatedAt,
);

exports.fromFormToEntity = ({
  id,
  user,
  pass,
  phone,
  firstName,
  lastName,
  country,
  subtitle,
  photo,
  bio,
  'created-at': createdAt,
}) => new User(
  id,
  user,
  pass,
  phone,
  firstName,
  lastName,
  country,
  subtitle,
  photo,
  bio,
  createdAt,
);
