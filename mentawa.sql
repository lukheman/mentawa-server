--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: akmal
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    machine_id character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(255)
);


ALTER TABLE public.users OWNER TO akmal;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: akmal
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO akmal;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akmal
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: akmal
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: akmal
--

COPY public.users (id, email, machine_id, token, created_at, name) FROM stdin;
3	akmal@gmail.com	machine123	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJtYWNoaW5lMTIzIiwiaWF0IjoxNzM0OTM2MzYyLCJleHAiOjE3MzUwMjI3NjJ9.rE5v_vyIn7hy_eJkkW0UJtxRbWPjXHoFQLCBK-ZC-bo	2024-12-23 14:47:37.864115	akmal
9	akmal@ac.id	machine1234	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJtYWNoaW5lMTIzNCIsImlhdCI6MTczNDk0OTQ0NywiZXhwIjoxNzM1MDM1ODQ3fQ.WfABIivtBOMPvk6YLkq2dyNDkY5loE1lXvuupxObaPc	2024-12-23 18:24:07.26007	Lukh
25	ak	eee0862b495646bda1d5ae7ad7ebf327	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJlZWUwODYyYjQ5NTY0NmJkYTFkNWFlN2FkN2ViZjMyNyIsImlhdCI6MTczNTAzMjc2NywiZXhwIjoxNzM1MTE5MTY3fQ.oa_cpnA7jxCR8EA9UjqWTvpy0X6m7Ym0LELhI-nZUHc	2024-12-24 17:32:47.896277	akmal
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akmal
--

SELECT pg_catalog.setval('public.users_id_seq', 25, true);


--
-- Name: users users_machine_id_key; Type: CONSTRAINT; Schema: public; Owner: akmal
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_machine_id_key UNIQUE (machine_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: akmal
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

