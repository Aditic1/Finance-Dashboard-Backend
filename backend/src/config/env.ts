export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "fallback_secret",
  databaseUrl: process.env.DATABASE_URL,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  adminEmail: process.env.ADMIN_EMAIL || "admin@financeapp.com",
  adminPassword: process.env.SEED_ADMIN_PASSWORD || "defaultPassword",
};
