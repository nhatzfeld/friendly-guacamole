INSERT INTO user_info
    (user_name, user_password)
VALUES
    ($1, $2)
RETURNING *