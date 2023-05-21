DROP TABLE IF EXISTS "journeys";
DROP SEQUENCE IF EXISTS journeys_id_seq;
CREATE SEQUENCE journeys_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."journeys" (
    "id" integer DEFAULT nextval('journeys_id_seq') NOT NULL,
    "departure" character varying(50) NOT NULL,
    "return" character varying(50) NOT NULL,
    "departure_station_id" integer NOT NULL,
    "departure_station_name" character varying(50) NOT NULL,
    "return_station_id" integer NOT NULL,
    "return_station_name" character varying(50) NOT NULL,
    "covered_distance" numeric NOT NULL,
    "duration" integer NOT NULL,
    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "stations";
DROP SEQUENCE IF EXISTS stations_fid_seq;
CREATE SEQUENCE stations_fid_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."stations" (
    "fid" integer DEFAULT nextval('stations_fid_seq') NOT NULL,
    "id" integer NOT NULL,
    "nimi" text NOT NULL,
    "namn" character varying(50) NOT NULL,
    "name" character varying(50) NOT NULL,
    "osoite" character varying(50) NOT NULL,
    "adress" character varying(50) NOT NULL,
    "kaupunki" text NOT NULL,
    "stad" character varying(50) NOT NULL,
    "operaattor" character varying(50) NOT NULL,
    "kapasiteet" character varying(50) NOT NULL,
    "x" character varying(50) NOT NULL,
    "y" character varying(50) NOT NULL,
    CONSTRAINT "stations_pkey" PRIMARY KEY ("fid")
) WITH (oids = false);
