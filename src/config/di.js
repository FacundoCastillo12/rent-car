const path = require('path');
const {
  default: DIContainer, object, use, factory,
} = require('rsdi');

const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');

const { CarController, CarRepository, CarService } = require('../module/car/module');
const { UserController, UserRepository, UserService } = require('../module/user/module');
// const { ReservationController, UserRepository, UserService } = require('../module/user/module');
function configureMainDatabaseAdapter() {
  return new Sqlite3Database(process.env.DB_PATH, { verbose: console.log });
}

// Ver si termino usando o no.
/*
function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}
*/

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.MULTER_UPLOADS_DIR);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.add({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */

function addCarModuleDefinitions(container) {
  container.add({
    CarController: object(CarController).construct(
      use('Multer'),
      use('CarService'),
    ),
    CarService: object(CarService).construct(use('CarRepository')),
    CarRepository: object(CarRepository).construct(use('MainDatabaseAdapter')),
  });
}
function addUserModuleDefinitions(container) {
  container.add({
    UserController: object(UserController).construct(
      use('Multer'),
      use('UserService'),
    ),
    UserService: object(UserService).construct(use('UserRepository')),
    UserRepository: object(UserRepository).construct(use('MainDatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addUserModuleDefinitions(container);
  // user o client
  // reservaciones
  return container;
};
