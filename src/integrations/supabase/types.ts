export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Cadastro_Alunos: {
        Row: {
          carimbo_data_hora: string | null
          cidade_residencia: string | null
          cidade_treinamento: string | null
          cpf: string
          data_treinamento: string | null
          email: string | null
          empresa: string | null
          escolaridade: string | null
          estado_emocional: string | null
          estado_residencia: string | null
          estado_treinamento: string | null
          funcao: string | null
          hora_treinamento: string | null
          id_aluno: string | null
          idade: string | null
          nome_completo: string | null
          telefone: string | null
          treinamento_id: number | null
        }
        Insert: {
          carimbo_data_hora?: string | null
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf: string
          data_treinamento?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          hora_treinamento?: string | null
          id_aluno?: string | null
          idade?: string | null
          nome_completo?: string | null
          telefone?: string | null
          treinamento_id?: number | null
        }
        Update: {
          carimbo_data_hora?: string | null
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf?: string
          data_treinamento?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          hora_treinamento?: string | null
          id_aluno?: string | null
          idade?: string | null
          nome_completo?: string | null
          telefone?: string | null
          treinamento_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Cadastro_Alunos_treinamento_id_fkey"
            columns: ["treinamento_id"]
            isOneToOne: false
            referencedRelation: "DADOS_TREINAMENTOS"
            referencedColumns: ["Treinamento_id"]
          },
        ]
      }
      DADOS_TREINAMENTOS: {
        Row: {
          CIDADE: string | null
          CONTRATO: string | null
          DATA: string | null
          "Data Fim": string | null
          "EMPRESA CLIENTE": string | null
          EQUIPE: string | null
          ESTADO: string | null
          Treinamento_id: number
        }
        Insert: {
          CIDADE?: string | null
          CONTRATO?: string | null
          DATA?: string | null
          "Data Fim"?: string | null
          "EMPRESA CLIENTE"?: string | null
          EQUIPE?: string | null
          ESTADO?: string | null
          Treinamento_id: number
        }
        Update: {
          CIDADE?: string | null
          CONTRATO?: string | null
          DATA?: string | null
          "Data Fim"?: string | null
          "EMPRESA CLIENTE"?: string | null
          EQUIPE?: string | null
          ESTADO?: string | null
          Treinamento_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      armor: {
        Args: { "": string }
        Returns: string
      }
      dearmor: {
        Args: { "": string }
        Returns: string
      }
      gen_random_bytes: {
        Args: { "": number }
        Returns: string
      }
      gen_random_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      gen_salt: {
        Args: { "": string }
        Returns: string
      }
      generate_unique_alphanumeric_id: {
        Args:
          | Record<PropertyKey, never>
          | { length_param: number; table_name: string; column_name: string }
        Returns: string
      }
      pgp_armor_headers: {
        Args: { "": string }
        Returns: Record<string, unknown>[]
      }
      pgp_key_id: {
        Args: { "": string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
