/*
 Navicat Premium Dump SQL

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 90100 (9.1.0)
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 90100 (9.1.0)
 File Encoding         : 65001

 Date: 01/12/2024 02:33:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_account_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `access_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `expires_at` int NULL DEFAULT NULL,
  `token_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `scope` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `id_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `session_state` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `refresh_token_expires_in` int NULL DEFAULT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `account_provider_provider_account_id_idx`(`provider` ASC, `provider_account_id` ASC) USING BTREE,
  INDEX `account_user_id_idx`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int NULL DEFAULT 0,
  `resource_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_type` int NULL DEFAULT NULL,
  `resource_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_level` int NULL DEFAULT NULL,
  `resource_show` tinyint(1) NULL DEFAULT NULL,
  `resource_cache` tinyint(1) NULL DEFAULT NULL,
  `resource_page_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `resource_status` int NULL DEFAULT 1,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  INDEX `permission_resource_name_idx`(`resource_name` ASC) USING BTREE,
  INDEX `permission_parent_id_idx`(`parent_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int NULL DEFAULT 0,
  `role_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `role_key` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `role_level` int NULL DEFAULT NULL,
  `role_status` int NULL DEFAULT 1,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `role_role_key_unique`(`role_key` ASC) USING BTREE,
  UNIQUE INDEX `role_role_key_idx`(`role_key` ASC) USING BTREE,
  INDEX `role_role_name_idx`(`role_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 0, '超级管理员', 'SPADMIN', 1, 0, '保留，不启用', 1, 1, 0, '2016-07-01 11:30:31', '2022-12-16 23:15:00', NULL);
INSERT INTO `role` VALUES (2, 0, '系统管理员', 'SYSADMIN', 2, 1, '管理系统权限资源等后台用户', 1, 1, 0, '2016-07-01 11:30:28', '2021-07-23 17:53:09', NULL);
INSERT INTO `role` VALUES (3, 0, '业务管理员', 'BUSINESS_ADMIN', 3, 1, '管理业务相关系统操作', 1, 1, 0, '2016-07-01 11:27:48', '2018-05-27 16:10:08', NULL);
INSERT INTO `role` VALUES (4, 0, '测试用户', 'TEST', 4, 1, '管理业务相关系统操作', 1, 1, 0, '2016-07-01 11:27:48', '2022-12-08 11:23:36', NULL);
INSERT INTO `role` VALUES (5, 0, '注册用户', 'USER', 4, 1, '管理业务相关系统操作', 1, 1, 0, '2016-07-01 11:27:48', '2020-11-29 19:34:34', NULL);

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` bigint NOT NULL,
  `permission_id` bigint NOT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime NOT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `session_session_token_unique`(`session_token` ASC) USING BTREE,
  INDEX `session_user_id_idx`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of session
-- ----------------------------

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `partial_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime NULL DEFAULT NULL,
  `last_used` datetime NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate_limit` int NULL DEFAULT 600,
  `scopes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `token_hashed_key_unique`(`hashed_key` ASC) USING BTREE,
  INDEX `token_user_id_idx`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `nickname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified` datetime NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `real_password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `mobile` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `real_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `gender` int NULL DEFAULT 2,
  `status` int NULL DEFAULT 1,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `country` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `province` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `city` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `area` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `user_cuid_unique`(`cuid` ASC) USING BTREE,
  UNIQUE INDEX `user_email_unique`(`email` ASC) USING BTREE,
  INDEX `user_email_idx`(`email` ASC) USING BTREE,
  INDEX `user_real_name_idx`(`real_name` ASC) USING BTREE,
  INDEX `user_mobile_idx`(`mobile` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '46bcf141-40c0-42f3-8981-d39ddca50dc0', NULL, '我是小海洋呀', '1037306928@qq.com', '2024-12-01 02:27:27', '$2a$10$.A59RMQnwSZPiul1xMW8R.FC5gt6cZ.juAu/2k36ziwjY4naMUr8e', '123456', NULL, NULL, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2024-12-01 02:27:17', '2024-12-01 02:27:26', NULL);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  INDEX `user_role_role_id_idx`(`role_id` ASC) USING BTREE,
  INDEX `user_role_user_id_idx`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, 5, NULL, NULL, NULL, 0, '2024-12-01 02:27:17', NULL, NULL);

-- ----------------------------
-- Table structure for verification_token
-- ----------------------------
DROP TABLE IF EXISTS `verification_token`;
CREATE TABLE `verification_token`  (
  `identifier` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime NOT NULL,
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `creator` bigint NULL DEFAULT NULL,
  `operator` bigint NULL DEFAULT NULL,
  `del_flag` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  UNIQUE INDEX `verification_token_token_unique`(`token` ASC) USING BTREE,
  UNIQUE INDEX `verification_token_identifier_token_idx`(`identifier` ASC, `token` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of verification_token
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
