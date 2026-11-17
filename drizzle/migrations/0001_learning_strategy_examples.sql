CREATE TABLE public.learning_strategy_examples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL DEFAULT 'zh' CHECK (language IN ('zh','en','es','he','ko','fr')),
  question text NOT NULL CHECK (char_length(question) BETWEEN 1 AND 120),
  answer text NOT NULL CHECK (char_length(answer) BETWEEN 10 AND 2000),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.learning_strategy_examples TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_strategy_examples TO authenticated;
GRANT ALL ON public.learning_strategy_examples TO service_role;
ALTER TABLE public.learning_strategy_examples ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read examples" ON public.learning_strategy_examples FOR SELECT USING (true);
CREATE POLICY "Admins insert examples" ON public.learning_strategy_examples FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update examples" ON public.learning_strategy_examples FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete examples" ON public.learning_strategy_examples FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER learning_strategy_examples_updated BEFORE UPDATE ON public.learning_strategy_examples FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();