DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id_sender INTEGER,
    id_recepient INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN
);

CREATE UNIQUE INDEX friendz ON friendships(greatest(id_sender,id_recepient), least(id_sender,id_recepient));

-- 1 2 3 4

-- SELECT * FROM friendships
-- WHERE ((id_sender = $1 AND id_recepient = $2)
-- WHERE (id_sender = $2 AND id_recepient = $1)) AND status = 1;
--
--
-- LOOKUP TABLE?

INSERT INTO friendships (id_sender, id_recepient, status) VALUES (21, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (25, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (28, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (29, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (32, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (35, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (41, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (45, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (128, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (129, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (132, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (135, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (121, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (125, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (68, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (69, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (72, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (75, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (71, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (85, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (88, 1, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (99, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (112, 1, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (115, 1, 'f');
