// config.js
require('dotenv').config();

const INTERACTION_ENGINE = process.env.INTERACTION_ENGINE || 'https://interaction.arrowai.in';
const EVENT_SERVER = process.env.EVENT_SERVER || 'https://event.arrowai.in';
const REDIS_URL_HOST = process.env.REDIS_URL_HOST || 'redis.svc.cluster.local';
const REDIS_URL_PORT = process.env.REDIS_URL_PORT || '6379';
const REDIS_PASS = process.env.REDIS_PASS || '';
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
const DB_CONNECTION_USER = process.env.DB_CONNECTION_USER || 'webmaster';
const DB_CONNECTION_PASSWORD = process.env.DB_CONNECTION_PASSWORD || '';
const DB_CONNECTION_STRING_FULL = process.env.DB_CONNECTION_STRING_FULL || '';
const DATABASE_NAME = process.env.DATABASE_NAME || 'platform_staging';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'platform_staging';
const MONGO_DB_URL = process.env.MONGO_DB_URL || '';
const MONGO_USER = process.env.MONGO_USER || 'webmaster';
const MONGO_PASS = process.env.MONGO_PASS || '';
const CAMPAIGN_NAMESPACE = process.env.CAMPAIGN_NAMESPACE || 'campaign-staging';
const CLOUD_PROJECTID = process.env.CLOUD_PROJECTID || 'arrowai-kubernetes';
const BIGQUERY_DATASET = process.env.BIGQUERY_DATASET || 'arrowaistaging';
const CLOUD_STORAGE_URL = process.env.CLOUD_STORAGE_URL || 'https://asia-southeast1-arrowai-kubernetes.cloudfunctions.net';

//
module.exports = {
  INTERACTION_ENGINE,
  EVENT_SERVER,
  REDIS_URL_HOST,
  REDIS_URL_PORT,
  REDIS_PASS,
  DB_CONNECTION_STRING,
  DB_CONNECTION_USER,
  DB_CONNECTION_PASSWORD,
  DB_CONNECTION_STRING_FULL,
  DATABASE_NAME,
  MONGO_DB_NAME,
  MONGO_DB_URL,
  MONGO_USER,
  MONGO_PASS,
  CAMPAIGN_NAMESPACE,
  CLOUD_PROJECTID,
  BIGQUERY_DATASET,
  CLOUD_STORAGE_URL

}
