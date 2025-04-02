-- usersテーブル
INSERT IGNORE INTO users (id, email, password) VALUES (1, 'taro.yamada@example.com', '$2a$10$2JNjTwZBwo7fprL2X4sv.OEKqxnVtsVQvuXDkI8xVGix.U3W5B7CO');
INSERT IGNORE INTO users (id, email, password) VALUES (2, 'taro.yamada@example.com', '$2a$10$2JNjTwZBwo7fprL2X4sv.OEKqxnVtsVQvuXDkI8xVGix.U3W5B7CO');

-- birdsテーブル
INSERT IGNORE INTO birds (id, user_id, name, gender, birthday, best_weight) VALUES (1, 1, 'つくし', 'おんなのこ', '04-01', 43);
INSERT IGNORE INTO birds (id, user_id, name, gender, birthday, best_weight) VALUES (2, 1, 'ちとせ', 'おとこのこ', '	10-01', 32);

-- health_recordsテーブル
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (1, 1, '2024-04-01', 45, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (2, 1, '2024-04-02', 44, 7, 27, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (3, 1, '2024-04-03', 46, 7, 25, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (4, 1, '2024-04-04', 43, 7, 26, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (5, 1, '2024-04-05', 45, 7, 28, 55, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (6, 1, '2024-04-06', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (7, 1, '2024-04-07', 44, 7, 25, 65, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (8, 1, '2024-04-08', 45, 7, 25, 60, 'カラッとしたいい天気');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (9, 1, '2024-04-09', 42, 7, 27, 70, '雨のため湿度が高め');
INSERT IGNORE INTO health_records (id, bird_id, day, weight, meal_amount, temperature, humidity, memo) VALUES (10, 1, '2024-04-10', 43, 7, 25, 80, '雨のため湿度がかなり高め、除湿器を使用');
