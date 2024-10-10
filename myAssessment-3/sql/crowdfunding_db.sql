


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (7, 'Social influence');
INSERT INTO `category` VALUES (8, 'Medical treatment');
INSERT INTO `category` VALUES (9, 'Community Development');
INSERT INTO `category` VALUES (10, 'Crisis relief');

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TARGET_FUNDING` decimal(10, 2) NULL DEFAULT NULL,
  `CURRENT_FUNDING` decimal(10, 2) NULL DEFAULT NULL,
  `CITY` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ACTIVE` tinyint(1) NULL DEFAULT 1,
  `CATEGORY_ID` int NULL DEFAULT NULL,
  `CONTENT` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `CATEGORY_ID`(`CATEGORY_ID` ASC) USING BTREE,
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Lily', 'To help Lily on her artistic journey', 6000.00, 3500.00, 'Brisbane', 1, 7, 'Lily is a talented young artist who wants to hold a solo art exhibition to showcase her unique artworks, including paintings, sculptures and more. These works mainly focus on the theme of environmental protection in the city, aiming to arouse people\'s attention to environmental issues through art. The rental of the exhibition space, the mounting of the works, the promotion and other financial support are required, and the total cost is estimated to be 6,000 AUD');
INSERT INTO `fundraiser` VALUES (2, 'Community Health Center', 'Community health center equipment renewal program', 12000.00, 8000.00, 'Gold Coast', 1, 8, 'Community health centers have been operating for many years, and some medical equipment such as electrocardiograph and blood pressure monitoring equipment are outdated and backward, which affects the accuracy and efficiency of diagnosis. The fundraising aims to update these critical medical equipment, purchase new and more advanced equipment, and provide better medical diagnostic services for the community, with an estimated need of 12,000 AUD for equipment procurement, transportation, installation and commissioning');
INSERT INTO `fundraiser` VALUES (3, 'Mark', 'Mark\'s educational innovation project launched', 3000.00, 2500.00, 'Canberra', 1, 9, 'Mark is an educator who plans to start an innovative educational project to introduce virtual reality (VR) technology into the teaching of science courses in local schools. He needs to purchase VR equipment, develop VR course content suitable for teaching, and conduct relevant technical training for teachers, with an estimated total cost of 8,500 AUD, hoping to improve students\' understanding and interest in scientific knowledge through this innovative teaching method');
INSERT INTO `fundraiser` VALUES (4, 'Post - Disaster Reconstruction Group', 'The town rebuilt itself after the disaster', 10000.00, 6000.00, 'Darwin', 1, 10, 'A small town in Darwin suffered severe flooding, with many homes damaged and infrastructure destroyed. The disaster recovery team hopes to raise 20,000 AUD to repair damaged houses, rebuild infrastructure such as roads and Bridges, and provide basic livelihood for affected residents, and has already raised 12,000 AUD');
INSERT INTO `fundraiser` VALUES (5, 'Luna White', 'Water Purification Project', 8000.00, 5000.00, 'Portland', 1, 9, 'Luna White is an education enthusiast who knows how important books are for children in remote areas. The fundraising project plans to build small libraries for schools in remote areas. Each library is expected to cost $20,000, including the purchase of shelves, tables and chairs, and a variety of books suitable for children of different ages. Her goal is to build libraries for 10 remote schools in two years, so the total fundraising goal is $200,000.');

SET FOREIGN_KEY_CHECKS = 1;
