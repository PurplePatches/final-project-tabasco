
DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship (
    id SERIAL PRIMARY KEY,
    requester_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    sentrequest BOOLEAN,
    accepted BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SELECT * FROM friendships
-- WHERE (recipient_id = $1 AND sender_id = $2)
-- OR (recipient_id = $2 AND sender_id = $1)


-- the same should be done in the delete request
--
-- we can create a table with the status os friendship (accepted, pending, not friends)
-- but is better a boolean saying if the friendship was accepted or not
--
--
--
-- table with id from the user requester, id with the user requested
--
--
-- when create a send friendship is  insert in the table,
-- when is accepted the friendship is an update to the TABLE
-- when in finished the friendship is deleted from the TABLE
--
-- 3 queries
-- insert
-- update (result from a boolean)
-- delete
--
--
-- db query
