-- usersテーブル
INSERT IGNORE INTO users (id, name, age, email, password) VALUES (1, '山田太郎', 24, 'taro.yamada@example.com', '$2a$10$2JNjTwZBwo7fprL2X4sv.OEKqxnVtsVQvuXDkI8xVGix.U3W5B7CO');
INSERT IGNORE INTO users (id, name, age, email, password) VALUES (2, '田中太郎', 45, 'taro.tanaka@example.com', '$2a$10$2JNjTwZBwo7fprL2X4sv.OEKqxnVtsVQvuXDkI8xVGix.U3W5B7CO');

-- birdsテーブル
INSERT IGNORE INTO birds (id, user_id, name, age, gender, birthday, best_weight) VALUES (1, 1, 'つくし', 5, 'おんなのこ', '2025-04-07', 43);
INSERT IGNORE INTO birds (id, user_id, name, age, gender, birthday, best_weight) VALUES (2, 1, 'ちとせ', 3, 'おとこのこ', '2025-04-07', 32);

-- health_recordsテーブル
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (1, 1, '2025-02-01', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (2, 1, '2025-02-02', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (3, 1, '2025-02-03', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (4, 1, '2025-02-04', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (5, 1, '2025-02-05', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (6, 1, '2025-02-06', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (7, 1, '2025-02-07', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (8, 1, '2025-02-08', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (9, 1, '2025-02-09', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (10, 1, '2025-02-10', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (11, 1, '2025-02-11', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (12, 1, '2025-02-12', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (13, 1, '2025-02-13', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (14, 1, '2025-02-14', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (15, 1, '2025-02-15', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (16, 1, '2025-02-16', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (17, 1, '2025-02-17', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (18, 1, '2025-02-18', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (19, 1, '2025-02-19', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (20, 1, '2025-02-20', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (21, 1, '2025-02-21', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (22, 1, '2025-02-22', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (23, 1, '2025-02-23', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (24, 1, '2025-02-24', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (25, 1, '2025-02-25', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (26, 1, '2025-02-26', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (27, 1, '2025-02-27', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (28, 1, '2025-02-28', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (29, 1, '2025-03-01', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (30, 1, '2025-03-02', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (31, 1, '2025-03-03', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (32, 1, '2025-03-04', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (33, 1, '2025-03-05', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (34, 1, '2025-03-06', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (35, 1, '2025-03-07', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (36, 1, '2025-03-08', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (37, 1, '2025-03-09', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (38, 1, '2025-03-10', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (39, 1, '2025-03-11', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (40, 1, '2025-03-12', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (41, 1, '2025-03-13', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (42, 1, '2025-03-14', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (43, 1, '2025-03-15', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (44, 1, '2025-03-16', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (45, 1, '2025-03-17', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (46, 1, '2025-03-18', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (47, 1, '2025-03-19', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (48, 1, '2025-03-20', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (49, 1, '2025-03-21', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (50, 1, '2025-03-22', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (51, 1, '2025-03-23', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (52, 1, '2025-03-24', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (53, 1, '2025-03-25', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (54, 1, '2025-03-26', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (55, 1, '2025-03-27', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (56, 1, '2025-03-28', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (57, 1, '2025-03-29', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (58, 1, '2025-03-30', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (59, 1, '2025-03-31', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');

