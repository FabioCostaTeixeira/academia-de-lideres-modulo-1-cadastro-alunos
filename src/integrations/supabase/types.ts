export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      Cadastro_Alunos_Mod_lll: {
        Row: {
          cidade_residencia: string | null
          cidade_treinamento: string | null
          cpf: number | null
          criado_em: string | null
          email: string | null
          empresa: string | null
          escolaridade: string | null
          estado_emocional: string | null
          estado_residencia: string | null
          estado_treinamento: string | null
          funcao: string | null
          id_aluno: number
          idade: number | null
          nome_completo: string | null
          telefone: number | null
          treinamento_id: string | null
        }
        Insert: {
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf?: number | null
          criado_em?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          id_aluno?: number
          idade?: number | null
          nome_completo?: string | null
          telefone?: number | null
          treinamento_id?: string | null
        }
        Update: {
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf?: number | null
          criado_em?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          id_aluno?: number
          idade?: number | null
          nome_completo?: string | null
          telefone?: number | null
          treinamento_id?: string | null
        }
        Relationships: []
      }
      certificados: {
        Row: {
          carga_horaria: string | null
          carimbo_data_hora: string | null
          data_conclusao_treinamento: string | null
          id_certificado: string
          link_download_direct: string | null
          link_download_view: string | null
          local_treinamento: string | null
          municipio_uf_treinamento: string | null
          nome_completo_aluno: string | null
        }
        Insert: {
          carga_horaria?: string | null
          carimbo_data_hora?: string | null
          data_conclusao_treinamento?: string | null
          id_certificado?: string
          link_download_direct?: string | null
          link_download_view?: string | null
          local_treinamento?: string | null
          municipio_uf_treinamento?: string | null
          nome_completo_aluno?: string | null
        }
        Update: {
          carga_horaria?: string | null
          carimbo_data_hora?: string | null
          data_conclusao_treinamento?: string | null
          id_certificado?: string
          link_download_direct?: string | null
          link_download_view?: string | null
          local_treinamento?: string | null
          municipio_uf_treinamento?: string | null
          nome_completo_aluno?: string | null
        }
        Relationships: []
      }
      dados_treinamento: {
        Row: {
          cidade: string | null
          cliente: string | null
          contrato_cliente: string | null
          data_inicio: string | null
          data_termino: string | null
          equipe: string | null
          estado: string | null
          Instrutor_Auxiliar: string | null
          Instrutor_Principal: string | null
          treinamento_id: number
        }
        Insert: {
          cidade?: string | null
          cliente?: string | null
          contrato_cliente?: string | null
          data_inicio?: string | null
          data_termino?: string | null
          equipe?: string | null
          estado?: string | null
          Instrutor_Auxiliar?: string | null
          Instrutor_Principal?: string | null
          treinamento_id: number
        }
        Update: {
          cidade?: string | null
          cliente?: string | null
          contrato_cliente?: string | null
          data_inicio?: string | null
          data_termino?: string | null
          equipe?: string | null
          estado?: string | null
          Instrutor_Auxiliar?: string | null
          Instrutor_Principal?: string | null
          treinamento_id?: number
        }
        Relationships: []
      }
      gabarito: {
        Row: {
          pergunta: string | null
          pergunta_id: string
          resposta_certa: string | null
        }
        Insert: {
          pergunta?: string | null
          pergunta_id: string
          resposta_certa?: string | null
        }
        Update: {
          pergunta?: string | null
          pergunta_id?: string
          resposta_certa?: string | null
        }
        Relationships: []
      }
      pesquisa_satisfacao: {
        Row: {
          "A carga horária ideal para o conteúdo abordado": string | null
          "Avaliação geral do conteúdo?": string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?": string | null
          "Capacidade de utilização do tempo": string | null
          "Carimbo de data/hora": string | null
          "Clareza e objetividade na exposição do tema?": string | null
          "Climatização, a eficiência de seu funcionamento?": string | null
          "Coffee Breack e alimentação?": string | null
          "Domínio dos conteúdos abordados?": string | null
          "Equipamentos de projeção e sonorização?": string | null
          "Habilidade para criar interesse sobre o assunto?": string | null
          "Hall de atendimento?": string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, ":
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d":
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente":
            | string
            | null
          pesquisa_id: string
          "Recepção?": string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?": string | null
          "Transmissão de confiança e credibilidade?": string | null
          treinamento_id: string | null
        }
        Insert: {
          "A carga horária ideal para o conteúdo abordado"?: string | null
          "Avaliação geral do conteúdo?"?: string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?"?: string | null
          "Capacidade de utilização do tempo"?: string | null
          "Carimbo de data/hora"?: string | null
          "Clareza e objetividade na exposição do tema?"?: string | null
          "Climatização, a eficiência de seu funcionamento?"?: string | null
          "Coffee Breack e alimentação?"?: string | null
          "Domínio dos conteúdos abordados?"?: string | null
          "Equipamentos de projeção e sonorização?"?: string | null
          "Habilidade para criar interesse sobre o assunto?"?: string | null
          "Hall de atendimento?"?: string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, "?:
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d"?:
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente"?:
            | string
            | null
          pesquisa_id?: string
          "Recepção?"?: string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?"?: string | null
          "Transmissão de confiança e credibilidade?"?: string | null
          treinamento_id?: string | null
        }
        Update: {
          "A carga horária ideal para o conteúdo abordado"?: string | null
          "Avaliação geral do conteúdo?"?: string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?"?: string | null
          "Capacidade de utilização do tempo"?: string | null
          "Carimbo de data/hora"?: string | null
          "Clareza e objetividade na exposição do tema?"?: string | null
          "Climatização, a eficiência de seu funcionamento?"?: string | null
          "Coffee Breack e alimentação?"?: string | null
          "Domínio dos conteúdos abordados?"?: string | null
          "Equipamentos de projeção e sonorização?"?: string | null
          "Habilidade para criar interesse sobre o assunto?"?: string | null
          "Hall de atendimento?"?: string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, "?:
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d"?:
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente"?:
            | string
            | null
          pesquisa_id?: string
          "Recepção?"?: string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?"?: string | null
          "Transmissão de confiança e credibilidade?"?: string | null
          treinamento_id?: string | null
        }
        Relationships: []
      }
      pos_teste: {
        Row: {
          carimbo_data_hora: string | null
          cpf: string | null
          data_treinamento: string | null
          hora_treinamento: string | null
          id_posteste: string
          id_treinamento: string | null
          nome_aluno: string | null
          pergunta01: string | null
          pergunta02: string | null
          pergunta03: string | null
          pergunta04: string | null
          pergunta05: string | null
          pergunta06: string | null
          pergunta07: string | null
          pergunta08: string | null
          pergunta09: string | null
          pergunta10: string | null
        }
        Insert: {
          carimbo_data_hora?: string | null
          cpf?: string | null
          data_treinamento?: string | null
          hora_treinamento?: string | null
          id_posteste?: string
          id_treinamento?: string | null
          nome_aluno?: string | null
          pergunta01?: string | null
          pergunta02?: string | null
          pergunta03?: string | null
          pergunta04?: string | null
          pergunta05?: string | null
          pergunta06?: string | null
          pergunta07?: string | null
          pergunta08?: string | null
          pergunta09?: string | null
          pergunta10?: string | null
        }
        Update: {
          carimbo_data_hora?: string | null
          cpf?: string | null
          data_treinamento?: string | null
          hora_treinamento?: string | null
          id_posteste?: string
          id_treinamento?: string | null
          nome_aluno?: string | null
          pergunta01?: string | null
          pergunta02?: string | null
          pergunta03?: string | null
          pergunta04?: string | null
          pergunta05?: string | null
          pergunta06?: string | null
          pergunta07?: string | null
          pergunta08?: string | null
          pergunta09?: string | null
          pergunta10?: string | null
        }
        Relationships: []
      }
      pre_teste: {
        Row: {
          carimbo_data_hora: string | null
          conviccaopergunta01: number | null
          conviccaopergunta02: number | null
          conviccaopergunta03: number | null
          conviccaopergunta04: number | null
          conviccaopergunta05: number | null
          conviccaopergunta06: number | null
          conviccaopergunta07: number | null
          conviccaopergunta08: number | null
          conviccaopergunta09: number | null
          conviccaopergunta10: number | null
          cpf: number | null
          data_treinamento: string | null
          hora_treinamento: string | null
          id_preteste: string
          id_treinamento: string | null
          nome_aluno: string | null
          pergunta01: string | null
          pergunta02: string | null
          pergunta03: string | null
          pergunta04: string | null
          pergunta05: string | null
          pergunta06: string | null
          pergunta07: string | null
          pergunta08: string | null
          pergunta09: string | null
          pergunta10: string | null
        }
        Insert: {
          carimbo_data_hora?: string | null
          conviccaopergunta01?: number | null
          conviccaopergunta02?: number | null
          conviccaopergunta03?: number | null
          conviccaopergunta04?: number | null
          conviccaopergunta05?: number | null
          conviccaopergunta06?: number | null
          conviccaopergunta07?: number | null
          conviccaopergunta08?: number | null
          conviccaopergunta09?: number | null
          conviccaopergunta10?: number | null
          cpf?: number | null
          data_treinamento?: string | null
          hora_treinamento?: string | null
          id_preteste?: string
          id_treinamento?: string | null
          nome_aluno?: string | null
          pergunta01?: string | null
          pergunta02?: string | null
          pergunta03?: string | null
          pergunta04?: string | null
          pergunta05?: string | null
          pergunta06?: string | null
          pergunta07?: string | null
          pergunta08?: string | null
          pergunta09?: string | null
          pergunta10?: string | null
        }
        Update: {
          carimbo_data_hora?: string | null
          conviccaopergunta01?: number | null
          conviccaopergunta02?: number | null
          conviccaopergunta03?: number | null
          conviccaopergunta04?: number | null
          conviccaopergunta05?: number | null
          conviccaopergunta06?: number | null
          conviccaopergunta07?: number | null
          conviccaopergunta08?: number | null
          conviccaopergunta09?: number | null
          conviccaopergunta10?: number | null
          cpf?: number | null
          data_treinamento?: string | null
          hora_treinamento?: string | null
          id_preteste?: string
          id_treinamento?: string | null
          nome_aluno?: string | null
          pergunta01?: string | null
          pergunta02?: string | null
          pergunta03?: string | null
          pergunta04?: string | null
          pergunta05?: string | null
          pergunta06?: string | null
          pergunta07?: string | null
          pergunta08?: string | null
          pergunta09?: string | null
          pergunta10?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
