
-- Drop the trigger to allow redefining the function cleanly
DROP TRIGGER IF EXISTS set_id_aluno_trigger ON "Cadastro_Alunos";

-- Remove existing function to prevent conflict and guarantee new code
DROP FUNCTION IF EXISTS public.set_id_aluno_for_new_records() CASCADE;

-- Re-create the function without assigning treinamento_id
CREATE OR REPLACE FUNCTION public.set_id_aluno_for_new_records()
RETURNS TRIGGER AS $$
BEGIN
    -- Se id_aluno não foi fornecido ou está vazio, gerar um novo
    IF NEW.id_aluno IS NULL OR NEW.id_aluno = '' THEN
        NEW.id_aluno := generate_unique_alphanumeric_id();
    END IF;

    -- treinamento_id não é mais alterado, permanece NULL se não enviado

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Re-create the trigger to use the new function
CREATE TRIGGER set_id_aluno_trigger
    BEFORE INSERT ON "Cadastro_Alunos"
    FOR EACH ROW
    EXECUTE FUNCTION set_id_aluno_for_new_records();
