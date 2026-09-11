/**
 * finDeck Unified Backend Export Gateway
 * 
 * Cleanly exposes the segregated backend subsystems:
 * - /database : SQL Store, Schemas, Seed data, Fee heads, Accounts
 * - /services : Ledger calculations, Snapshot aggregates, Waterfall payments
 * - /ai       : Autonomous Finance Agent, AI NLP reasoning, Validation
 * - /auth     : Role-Based Access Control (RBAC) & SSO Context
 */

export * from "./database";
export * from "./services";
export * from "./ai";
export * from "./auth";
