CREATE TABLE public.learning_ai_access_state (id text PRIMARY KEY, status integer NOT NULL, message text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.learning_ai_access_state TO service_role;
ALTER TABLE public.learning_ai_access_state ENABLE ROW LEVEL SECURITY;