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

INSERT INTO friendships (id_sender, id_recepient, status) VALUES (21, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (25, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (28, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (29, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (32, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (35, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (41, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (45, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (128, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (129, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (132, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (135, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (121, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (125, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (68, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (69, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (72, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (75, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (71, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (85, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (88, 201, 't');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (99, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (112, 201, 'f');
INSERT INTO friendships (id_sender, id_recepient, status) VALUES (115, 201, 'f');
