DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id_sender INTEGER,
    id_recepient INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN
);

CREATE UNIQUE INDEX friendz ON friendships(greatest(id_sender,id_recepient), least(id_sender,id_recepient));

-- 1 2 3 4

SELECT * FROM friendships
WHERE ((id_sender = $1 AND id_recepient = $2)
WHERE (id_sender = $2 AND id_recepient = $1)) AND status = 1;


LOOKUP TABLE?
