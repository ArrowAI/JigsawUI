function define(name, value) {
  Object.defineProperty(exports, name, {
    value: process.env[name] || value,
    enumerable: true,
  });
}
var nodeEnv = process.env.GITLAB_ENVIRONMENT_NAME || "production", mongoUser = "", mongoPassword = "";
define("SERVER_ENV", nodeEnv);

if (nodeEnv == "local") {
  
  define("INTERACTION_ENGINE", "https://interaction.arrowai.in");
  define("REDIS_URL_HOST", "arrowai.redis.cache.windows.net");
  define("REDIS_URL_PORT", "6379");
  define("REDIS_PASS", "");
  define("DB_CONNECTION_STRING","");
  define("DB_CONNECTION_USER", "arrowsldb");
  define("DB_CONNECTION_PASSWORD","");
  define("EVENT_SERVER", "https://event.arrowai.in");
  define("DB_CONNECTION_STRING_FULL","");
  define("EVENT_SERVER", "https://event.arrowai.in");
  define("CAMPAIGN_NAMESPACE", "campaign");
  define("DATABASE_NAME", "platform_production");
  define("CLOUD_PROJECTID", "arrowai-kubernetes");
  define("BIGQUERY_DATASET", "arrowaiproduction");
  define("MONGO_DB","");
  define("MONGO_USER", "arrowcosmodb");
  define("MONGO_DB_NAME", "platform_production");
  define("MONGO_PASS","");
  define("CLOUD_STORAGE_URL","https://asia-southeast1-arrowai-kubernetes.cloudfunctions.net");

} else if (nodeEnv =="staging") {
  define("INTERACTION_ENGINE", "https://interaction-staging.arrowai.in");
  define("REDIS_URL_HOST", "arrowai.redis.cache.windows.net");
  define("REDIS_URL_PORT", "6379");
  define("REDIS_PASS", "");
  define("DB_CONNECTION_STRING","");
  define("DB_CONNECTION_USER", "arrowaisldev");
  define("DB_CONNECTION_PASSWORD","");
  define("DB_CONNECTION_STRING_FULL","");
  define("EVENT_SERVER", "https://event.arrowai.in");
  define("CAMPAIGN_NAMESPACE", "campaign-staging");
  define("DATABASE_NAME", "platform_staging");
  define("CLOUD_PROJECTID", "arrowai-kubernetes");
  define("BIGQUERY_DATASET", "arrowaistaging");
  define("MONGO_DB_NAME", "platform_staging");
  define("MONGO_DB","");
  define("MONGO_USER", "arrowcosmodb");
  define("MONGO_PASS","");
  define("CLOUD_STORAGE_URL","https://asia-southeast1-arrowai-kubernetes.cloudfunctions.net");

} else if (nodeEnv =="production") {

  //Peer Server Urls
  define("INTERACTION_ENGINE", "https://interaction-staging.arrowai.in");
  define("EVENT_SERVER", "https://event-staging.arrowai.in");
  
  // Redis Data
  define("REDIS_URL_HOST", "redis.svc.cluster.local");
  define("REDIS_URL_PORT", "6379");
  define("REDIS_PASS", "1234");

  // MongoDb Connection
  define("DB_CONNECTION_STRING", "" );
  define("DB_CONNECTION_USER", "webmaster");
  define("DB_CONNECTION_PASSWORD","");
  define("DB_CONNECTION_STRING_FULL", "" );
  define("DATABASE_NAME", "platform_staging");

  // Chat Storage
  define("MONGO_DB_NAME", "platform_staging");
  define("MONGO_DB", "");
  define("MONGO_USER", "webmaster");
  define("MONGO_PASS","");

  define("CAMPAIGN_NAMESPACE", "campaign-staging");

  define("CLOUD_PROJECTID", "arrowai-kubernetes");
  define("BIGQUERY_DATASET", "arrowaistaging");

  define("CLOUD_STORAGE_URL","https://asia-southeast1-arrowai-kubernetes.cloudfunctions.net");
}
