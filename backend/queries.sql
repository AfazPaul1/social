SELECT * FROM public."Reaction"
where "userId"='cmcdp44zr0000buiohxoyrzle'
ORDER BY "userId" ASC, "postId" ASC 

SELECT reltuples::bigint AS estimated_rows
FROM pg_class
WHERE relname = 'Reaction';

ANALYZE "Reaction";

SELECT
    i.relname AS index_name,
    a.attname AS column_name
FROM
    pg_class t
JOIN pg_index ix ON t.oid = ix.indrelid
JOIN pg_class i ON i.oid = ix.indexrelid
JOIN pg_attribute a ON a.attrelid = t.oid
WHERE
    t.relname = 'Reaction'
    AND a.attnum = ANY(ix.indkey);

EXPLAIN ANALYZE
DELETE FROM "Reaction"
WHERE "postId"='cmmdrcwwq0001bus4jhcizsi8'
AND "userId"='cmltcmfmb0000bu7wpawt651e';

EXPLAIN ANALYZE 
SELECT 
  COUNT("public"."Reaction"."type"), 
  "public"."Reaction"."postId", 
  "public"."Reaction"."type"::text 
FROM "public"."Reaction" 
WHERE "public"."Reaction"."postId" IN (
    '1grfwtb',
    '1gt3qv8',
    '1gt2y5q',
    '1gt5p9y',
    'cmcd3ahvt0000bu009bvqmadt',
    '1harnu9',
    '1harokp',
    '1hbjymx',
    'cmcd2d9g20002bu4w98hrh21d',
    '1gqkb5g',
    '1gq3wqv',
    '1gtksxb',
    '1gumbdb',
    'cmcd9wj9w0000bu905k2tpk4a',
    'cmcda1v7f0000bukkpgibs8sj',
    '1gvhh9d',
    '1gvlwoc',
    '1gwlirm',
    '1gy9laf',
    '1gy9v4s',
    '1gyl01f',
    '1gyxmcb',
    '1gyz6yv',
    '1gz01t2',
    '1gzuh2p',
    '1h13dv0',
    '1h1zafd',
    '1h20vee',
    '1h235b4',
    '1h2c78v',
    '1h30vr2',
    '1h57oad',
    '1hempj0',
    '1h5khyw',
    '1h6t4tf',
    '1h8iyk1',
    '1h9hp86',
    '1hawo9e',
    '1hb5c7g',
    '1hbifhd',
    '1hfrgw6',
    '1hdl8qp',
    '1hdunge',
    '1heiyk8',
    '1hf3qra',
    '1hgow3n',
    '1hgr6d4',
    '1hhchee',
    '1hi4qmd',
    '1hjmray',
    '1hjtezy',
    'cmcd398qo0000bue8ia1dzpm2',
    '1hlte9r',
    '1hmbkf9',
    '1holjjd',
    '1hopxg2',
    '1grp6ra',
    'cmcd28pqs0000bu4w18bbb6y2',
    'cmcd29xzv0001bu4wtyt9epq7',
    '1gppg6k',
    'cmchu5er90001buvc9353t40s',
    'cmchua0nx0003buvco3ig7wae',
    'cmchual170005buvc28aeaifk',
    'cmchuawo60007buvcp02gg39d',
    'cmchuc9350009buvcmnrvddxy',
    'cmchuclav000bbuvceeoas3nk',
    'cmchueery000dbuvcf4ldb3ag',
    'cmchuy6zr0001bud41v9wnw5m',
    'cmchv2rpo0001buh4wqc8656i',
    'cmcit26jq0001bu4c0if1ahxh',
    'cmcit4n3f0003bu4ck7l7bo54',
    'cmcit55yn0001buuwjrotx6su',
    'cmcitv5t10001bumg5ka36zqw',
    'cmcitxpqq0003bumgueapvshl',
    'cmcityboi0001bu983wrg8g36',
    'cmciu68cm0001buks6bsyhe6j',
    'cmciu6oz40001bukww91v1eyf',
    'cmciu7maf0001buhgzw16m0vy',
    'cmciu7zeb0003buhgu5ztz4p3',
    'cmciuai5k0001bukodwgzkr8s',
    'cmciug84r0001buzo1ip5tfxq',
    'cmciwt4la0001bumcn7cyr2gx',
    'cmcix3lmr0003bumcd19k5xzd',
    'cmcixe1cd0005bumczrupn8d1',
    'cmcizhzrw0007bumcetaxfh7g',
    '1gp6qwg',
    '1gr6310',
    'cmeo0598a0001bujoqotdbqqa',
    'cmeo0769k0003bujoxftw7765',
    'cmeo0954d0005bujod1xka0hm',
    'cmieq4ajh0001bug4jwqlchlz',
    'cmm0les2w0001buls4zrl49hs',
    'cmm0lfeek0003bulspxhqr1dl',
    'cmm4xxdh30001butgnnsgrwf9',
    'cmm4xxw4w0003butgswp5w03q',
    'cmm6gnaac0001buvka3wnu6l4',
    'cmm0tvkl20001bu5cqkc9a3sm',
    'cmmd2eu350001buygltz8svun',
    'cmmd3rqli0003buygr7j91imh',
    'cmmdrcwwq0001bus4jhcizsi8'
)
GROUP BY "public"."Reaction"."postId", "public"."Reaction"."type";

SET enable_seqscan = off;
-- Run your EXPLAIN ANALYZE query here
SET enable_seqscan = on;

CREATE INDEX idx_reaction_postid_type
ON "Reaction"("postId", "type");