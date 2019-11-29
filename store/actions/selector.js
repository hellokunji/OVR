/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

export const getUserId = state => state.auth.userId;
export const getAccessToken = state => state.auth.token;
export const getUsageRole = state => state.profile.getUser.data.usage_role;
export const getPreference = state => state.profile.getProfile.data.preference;
export const getProfiles = state => state.profileInfo.profiles.data;
export const fetchChatHistory = state => state.directMessage.history.data;
