/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : home

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 16/07/2022 18:00:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(100) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '胡图图', 'U2FsdGVkX1+qsdQ7MDU7+Ga1+osRwnvXtxNPivpOIfY=');

-- ----------------------------
-- Table structure for agent
-- ----------------------------
DROP TABLE IF EXISTS `agent`;
CREATE TABLE `agent`  (
  `agent_id` int(100) NOT NULL AUTO_INCREMENT,
  `agent_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `agent_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '从业时间',
  `agent_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系方式',
  `agent_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ctime` datetime NULL DEFAULT NULL,
  `agent_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`agent_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of agent
-- ----------------------------
INSERT INTO `agent` VALUES (10, '胡英俊', '20', '5264588000', '/uploads/file-1657764023232.jpg', '2022-07-10 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (12, '胡图图', '21', '5264588222', '/uploads/file-1657764215700.jpg', '2022-07-10 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (13, '张美丽', '30', '5269874101', '/uploads/file-1657764240300.jpg', '2022-07-10 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (14, '王爱爱', '10', '5269874101', '/uploads/file-1657764240300.jpg', '2022-07-10 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (15, '王童童', '5', '1258963251', '/uploads/file-1657764240300.jpg', '2022-07-11 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (16, '宋元元', '25', '1234567896', '/uploads/file-1657764240300.jpg', '2022-07-11 14:57:36', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (17, '王红红', '15', '13663698524', '/uploads/file-1657786645598.jpg', '2022-07-14 16:18:04', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');
INSERT INTO `agent` VALUES (18, '宋媛媛', '10', '13663652879', '/uploads/file-1657850356742.jpg', '2022-07-15 09:59:54', '<p>要把客户当成朋友，真正的朋友（做事情，其实就是一个做人的过程，当我们初次与客户见面的时候，客户往往是有一定的防备心理的，这时候，我们要真诚，让客户信任你，最终才会成交</p>');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `banner_id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `banner_sort` int(255) NULL DEFAULT NULL,
  `banner_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`banner_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (54, '家居网', 8, '/uploads/file-1657958433015.png');
INSERT INTO `banner` VALUES (55, '房源信息', 1, '/uploads/file-1657958433015.png');
INSERT INTO `banner` VALUES (56, '关于我们', 9, '/uploads/file-1657958505759.png');

-- ----------------------------
-- Table structure for home
-- ----------------------------
DROP TABLE IF EXISTS `home`;
CREATE TABLE `home`  (
  `home_id` int(100) NOT NULL AUTO_INCREMENT,
  `home_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `home_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `home_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `home_sort` int(255) NULL DEFAULT NULL,
  `home_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ctime` datetime NULL DEFAULT NULL,
  `home_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `kitchen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bedchamber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `toilet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Living_room` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parking_space` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`home_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of home
-- ----------------------------
INSERT INTO `home` VALUES (2, '文澜二', '山西省太原市', '999999￥', 2, '/uploads/file-1657682219878.png', '2022-07-10 11:04:15', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全！干净舒适，房间光线足，通风性能良好。周一至周五晚上7：30－9：30看房比较好，周六日可随时看房。</p>', '2', '4', '1', '1', '2');
INSERT INTO `home` VALUES (3, '文澜三', '山西省太原市', '999999￥', 3, '/uploads/file-1657682219878.png', '2022-07-10 11:04:15', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全</p>', '4', '3', '1', '2', '1');
INSERT INTO `home` VALUES (5, '文韬一', '山西省太原市', '888888￥', 5, '/uploads/file-1657682219878.png', '2022-07-10 11:04:15', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全！干净舒适，房间光线足，通风性能良好。周一至周五晚上7：30－9：30看房比较好，周六日可随时看房。</p>', '2', '2', '1', '2', '1');
INSERT INTO `home` VALUES (6, '文韬三', '山西省太原市', '888800￥', 6, '/uploads/file-1657682219878.png', '2022-07-10 11:04:15', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全！干净舒适，房间光线足，通风性能良好。周一至周五晚上7：30－9：30看房比较好，周六日可随时看房。</p>', '1', '2', '2', '2', '2');
INSERT INTO `home` VALUES (7, '海洋之心', '山西省大同市', '669582￥', 7, '/uploads/file-1657682219878.png', '2022-07-11 11:04:15', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全</p>', '1', '1', '2', '2', '1');
INSERT INTO `home` VALUES (8, '水木清华', '山西省太原市', '333333￥', 20, '/uploads/file-1657689262302.png', '2022-07-13 13:14:24', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br><br>交通方便：有路公交车到，周围有个菜市场。本栋楼层共层，所在楼层为楼！小区物业式管理，非常安全！干净舒适，房间光线足，通风性能良好。周一至周五晚上7：30－9：30看房比较好，周六日可随时看房。</p>', '1', '1', '1', '2', '1');

-- ----------------------------
-- Table structure for nav
-- ----------------------------
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav`  (
  `nav_id` int(255) NOT NULL AUTO_INCREMENT,
  `nav_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nav_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '导航的别名',
  `nav_sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '导航的分类',
  `is_show` tinyint(255) NULL DEFAULT NULL COMMENT '是否显示，1显示，0不',
  `nav_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`nav_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of nav
-- ----------------------------
INSERT INTO `nav` VALUES (1, '家居网', 'JJW', '1', 1, '/index/index');
INSERT INTO `nav` VALUES (2, '房源信息', 'FYXX', '2', 1, '/index/list');
INSERT INTO `nav` VALUES (3, '关于我们', 'GYWM', '3', 1, '/index/about');
INSERT INTO `nav` VALUES (4, '特色专题', 'YYDLR', '4', 1, '/index/single');
INSERT INTO `nav` VALUES (26, '导航管理', 'DHGL', '10', NULL, '/index/happy');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `project_id` int(255) NOT NULL AUTO_INCREMENT,
  `project_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `project_thumb` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `project_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `project_banner` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pc_id` int(11) NULL DEFAULT NULL,
  `is_delete` tinyint(255) NULL DEFAULT NULL COMMENT '0未删除',
  `ctime` datetime NULL DEFAULT NULL,
  `p_kitchen` int(255) NULL DEFAULT NULL,
  `p_toilet` int(255) NULL DEFAULT NULL,
  `p_bedchamber` int(255) NULL DEFAULT NULL,
  `p_Livingroom` int(255) NULL DEFAULT NULL,
  `p_parkingspace` int(255) NULL DEFAULT NULL,
  `project_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` int(100) NULL DEFAULT NULL,
  `project_location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (19, '粉色城市', '/uploads/file-1657766296546.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。<br></p>', '/uploads/file-1657766303421.jpg,/uploads/file-1657766303426.jpg', 1, 0, '2022-07-14 10:38:40', 1, 2, 1, 1, 2, '1589625￥', 2, '山西省太原市');
INSERT INTO `project` VALUES (20, '盛世华庭', '/uploads/file-1657766556664.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657766562019.jpg,/uploads/file-1657766562024.jpg', 2, 0, '2022-07-14 10:43:03', 2, 1, 2, 1, 2, '7895888￥', 2, '山西省大同市');
INSERT INTO `project` VALUES (21, '星河湾', '/uploads/file-1657766613003.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657766562019.jpg,/uploads/file-1657766562024.jpg,/uploads/file-1657766619895.jpg,/uploads/file-1657766619926.jpg', 2, 0, '2022-07-14 10:43:45', 3, 1, 2, 1, 2, '6589632￥', 3, '山西省临汾市');
INSERT INTO `project` VALUES (23, '秀水家园', '/uploads/file-1657766706539.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657766562019.jpg,/uploads/file-1657766562024.jpg,/uploads/file-1657766619895.jpg,/uploads/file-1657766619926.jpg', 1, 0, '2022-07-14 10:45:08', 1, 2, 4, 1, 4, '2225852￥', 2, '山东省潍坊市');
INSERT INTO `project` VALUES (24, '龙泉国际', '/uploads/file-1657767595721.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657767600898.jpg,/uploads/file-1657767600902.jpg', 2, 0, '2022-07-14 11:00:18', 2, 2, 3, 1, 3, '2596325￥', 1, '山西省吕梁市');
INSERT INTO `project` VALUES (25, '青少年活动中心', '/uploads/file-1657786489035.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657786495252.jpg,/uploads/file-1657786495249.jpg', 2, 1, '2022-07-14 16:15:11', 1, 2, 3, 1, 3, '9999996￥', 2, '陕西省西安市');
INSERT INTO `project` VALUES (26, '中北大学11号楼', '/uploads/file-1657786489035.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657786495252.jpg,/uploads/file-1657786495249.jpg', 2, 0, '2022-07-14 16:15:11', 9, 3, 10, 5, 4, '9999999￥', 4, '山西省长治市');
INSERT INTO `project` VALUES (29, '中北大学', '/uploads/file-1657960376698.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657960382198.jpg,/uploads/file-1657960382235.jpg', 1, 0, '2022-07-16 16:33:31', 4, 5, 8, 10, 10, '999999￥', 5, '山西省太原市');
INSERT INTO `project` VALUES (30, '中北大学主楼', '/uploads/file-1657960571867.jpg', '<p>房子概况：有空调／热水器／餐桌齐全（为房东配备）、电视、小部分家具、沙发（可共用）部分厨具（锅碗瓢盆）为我自备，但欢迎共用。要出租的房间有：大床和床垫、衣柜、电脑桌，方便带衣即可入住，光线好，很温馨。</p>', '/uploads/file-1657960577276.jpg,/uploads/file-1657960577321.jpg', 2, 0, '2022-07-16 16:36:35', 8, 9, 20, 10, 12, '9999999￥', 8, '山西省太原市');

-- ----------------------------
-- Table structure for project_cate
-- ----------------------------
DROP TABLE IF EXISTS `project_cate`;
CREATE TABLE `project_cate`  (
  `pc_id` int(11) NOT NULL,
  `pc_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_delete` tinyint(255) NULL DEFAULT NULL,
  PRIMARY KEY (`pc_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_cate
-- ----------------------------
INSERT INTO `project_cate` VALUES (1, '中式建筑', 0);
INSERT INTO `project_cate` VALUES (2, '法式建筑', 0);
INSERT INTO `project_cate` VALUES (3, '英式建筑', 0);

-- ----------------------------
-- Table structure for special
-- ----------------------------
DROP TABLE IF EXISTS `special`;
CREATE TABLE `special`  (
  `special_id` int(100) NOT NULL AUTO_INCREMENT COMMENT '客户感言',
  `special_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_show` tinyint(255) NULL DEFAULT NULL COMMENT '是否显示专题；1显示',
  `special_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `special_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ctime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`special_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of special
-- ----------------------------
INSERT INTO `special` VALUES (15, '宋媛媛', 1, '<p>我们非常喜欢这个网站，它为我们的生活带来方便，使得我们找到了自己理想中的房子，是我做过最正确的决定，感谢我的代理人和开发网站的人员，栓Q<br></p>', '/uploads/file-1657378442842.jpg', '2022-07-14 10:03:19');
INSERT INTO `special` VALUES (16, '胡图图', 1, '<p>我们非常喜欢这个网站，它为我们的生活带来方便，使得我们找到了自己理想中的房子，是我做过最正确的决定，感谢我的代理人和开发网站的人员，栓Q<br></p>', '/uploads/file-1657424856491.jpg', '2022-07-14 10:03:40');
INSERT INTO `special` VALUES (17, '刷子', 1, '<p>我们非常喜欢这个网站，它为我们的生活带来方便，使得我们找到了自己理想中的房子，是我做过最正确的决定，感谢我的代理人和开发网站的人员，栓Q<br></p>', '/uploads/file-1657522654594.jpg', '2022-07-14 10:04:02');
INSERT INTO `special` VALUES (18, '小美', 1, '<p>我们非常喜欢这个网站，它为我们的生活带来方便，使得我们找到了自己理想中的房子，是我做过最正确的决定，感谢我的代理人和开发网站的人员，栓Q<br></p>', '/uploads/file-1657764254724.jpg', '2022-07-14 10:04:17');
INSERT INTO `special` VALUES (19, '胡呼呼', 1, '<p>我们非常喜欢这个网站，它为我们的生活带来方便，使得我们找到了自己理想中的房子，是我做过最正确的决定，感谢我的代理人和开发网站的人员，栓Q<br></p>', '/uploads/file-1657850439344.jpg', '2022-07-15 10:01:01');

SET FOREIGN_KEY_CHECKS = 1;
