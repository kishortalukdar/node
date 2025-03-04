'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import configData from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db = {};
let sequelize;

// **Function to load models dynamically**
const loadModels = async () => {
  const modelFiles = fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js') && !file.includes('.test.js'));

  for (const file of modelFiles) {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;

    const modelModule = await import(modelPath);

    if (modelModule.default) {
      const model = modelModule.default(sequelize, Sequelize.DataTypes);

      if (model && model.name) {
        db[model.name] = model; 
      } else {
        console.error(`Model ${file} did not load correctly.`);
      }
    }
  }

  // **Set up associations after all models are loaded**
  Object.keys(db).forEach(modelName => {
    console.log(`Checking model: ${modelName}`);
    if (db[modelName].associate) {
      console.log(`Associating model: ${modelName}`);
      db[modelName].associate(db);
    }
  });
};

const connectDb = async () => {
  try {
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');

    //Load models AFTER Sequelize is initialized
    await loadModels();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// **Export db after models are loaded**
export { connectDb as connectDB, db };
