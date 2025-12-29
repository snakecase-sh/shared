"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/plans.ts
var plans_exports = {};
__export(plans_exports, {
  PLAN_LIMITS: () => PLAN_LIMITS
});
module.exports = __toCommonJS(plans_exports);
var PLAN_LIMITS = {
  free: {
    messageTextMaxChars: 4e3,
    codeBlockMaxChars: 3e4,
    attachmentMaxSize: 10 * 1024 * 1024,
    // 10 MB
    storageTotal: 1 * 1024 * 1024 * 1024,
    // 1 GB
    retentionDays: 30,
    dmRequestsPerDay: 5,
    dmRequestsPendingMax: 10,
    aiActionsPerWeek: 10,
    groupsMax: 3,
    groupMembersMax: 20
  },
  pro: {
    messageTextMaxChars: 2e4,
    codeBlockMaxChars: 2e5,
    attachmentMaxSize: 100 * 1024 * 1024,
    // 100 MB
    storageTotal: 50 * 1024 * 1024 * 1024,
    // 50 GB
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true
  },
  team: {
    messageTextMaxChars: 2e4,
    codeBlockMaxChars: 2e5,
    attachmentMaxSize: 100 * 1024 * 1024,
    // 100 MB
    storageTotal: 100 * 1024 * 1024 * 1024,
    // 100 GB per user
    retentionDays: 365,
    dmRequestsPerDay: Infinity,
    dmRequestsPendingMax: Infinity,
    aiActionsPerWeek: Infinity,
    groupsMax: Infinity,
    groupMembersMax: Infinity,
    exportsEnabled: true,
    auditLogsEnabled: true,
    samlSSOEnabled: true
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PLAN_LIMITS
});
