
-- Drop the trigger first, then drop the function with CASCADE to ensure dependencies are removed
DROP TRIGGER IF EXISTS set_id_aluno_trigger ON "Cadastro_Alunos";
DROP TRIGGER IF EXISTS set_aluno_id_on_cpf_trigger ON "Cadastro_Alunos";
DROP FUNCTION IF EXISTS public.set_aluno_id_on_cpf() CASCADE;

-- Now create the new function for id_aluno generation and training default
CREATE OR REPLACE FUNCTION public.set_id_aluno_for_new_records()
RETURNS TRIGGER AS $$
BEGIN
    -- Se id_aluno não foi fornecido ou está vazio, gerar um novo
    IF NEW.id_aluno IS NULL OR NEW.id_aluno = '' THEN
        NEW.id_aluno := generate_unique_alphanumeric_id();
    END IF;

    -- Se treinamento_id não foi fornecido, usar valor padrão
    IF NEW.treinamento_id IS NULL THEN
        NEW.treinamento_id := 1;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the corrected trigger
CREATE TRIGGER set_id_aluno_trigger
    BEFORE INSERT ON "Cadastro_Alunos"
    FOR EACH ROW
    EXECUTE FUNCTION set_id_aluno_for_new_records();
