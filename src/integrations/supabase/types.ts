export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_analytics: {
        Row: {
          avg_time_on_page: number | null
          blog_post_id: number | null
          bounce_rate: number | null
          comments: number | null
          created_at: string
          id: number
          page_views: number | null
          scroll_depth: number | null
          social_shares: number | null
          tracked_date: string | null
          unique_visitors: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          blog_post_id?: number | null
          bounce_rate?: number | null
          comments?: number | null
          created_at?: string
          id?: number
          page_views?: number | null
          scroll_depth?: number | null
          social_shares?: number | null
          tracked_date?: string | null
          unique_visitors?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          blog_post_id?: number | null
          bounce_rate?: number | null
          comments?: number | null
          created_at?: string
          id?: number
          page_views?: number | null
          scroll_depth?: number | null
          social_shares?: number | null
          tracked_date?: string | null
          unique_visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_analytics_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_image: string | null
          author_name: string | null
          author_role: string | null
          bg: string | null
          border: string | null
          category: string
          color: string | null
          content: string | null
          created_at: string
          date: string | null
          excerpt: string
          id: number
          image: string
          meta_description: string | null
          meta_keywords: string | null
          read_time: string
          scheduled_for: string | null
          status: string | null
          tags: string[] | null
          title: string
          views: number | null
        }
        Insert: {
          author_image?: string | null
          author_name?: string | null
          author_role?: string | null
          bg?: string | null
          border?: string | null
          category: string
          color?: string | null
          content?: string | null
          created_at?: string
          date?: string | null
          excerpt: string
          id?: number
          image: string
          meta_description?: string | null
          meta_keywords?: string | null
          read_time: string
          scheduled_for?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          views?: number | null
        }
        Update: {
          author_image?: string | null
          author_name?: string | null
          author_role?: string | null
          bg?: string | null
          border?: string | null
          category?: string
          color?: string | null
          content?: string | null
          created_at?: string
          date?: string | null
          excerpt?: string
          id?: number
          image?: string
          meta_description?: string | null
          meta_keywords?: string | null
          read_time?: string
          scheduled_for?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      brand_voice_profile: {
        Row: {
          created_at: string
          example_excerpts: Json | null
          forbidden_terms: string[] | null
          id: number
          key_phrases: string[] | null
          last_synced_at: string
          source: string
          tone_descriptors: string[] | null
          topics_covered: string[] | null
          writing_style_notes: string | null
        }
        Insert: {
          created_at?: string
          example_excerpts?: Json | null
          forbidden_terms?: string[] | null
          id?: number
          key_phrases?: string[] | null
          last_synced_at?: string
          source?: string
          tone_descriptors?: string[] | null
          topics_covered?: string[] | null
          writing_style_notes?: string | null
        }
        Update: {
          created_at?: string
          example_excerpts?: Json | null
          forbidden_terms?: string[] | null
          id?: number
          key_phrases?: string[] | null
          last_synced_at?: string
          source?: string
          tone_descriptors?: string[] | null
          topics_covered?: string[] | null
          writing_style_notes?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          category: string
          challenge: string
          client: string
          created_at: string
          full_description: string | null
          headline: string
          id: string
          image: string
          results: string
          solution: string
          stats: Json | null
        }
        Insert: {
          category: string
          challenge: string
          client: string
          created_at?: string
          full_description?: string | null
          headline: string
          id: string
          image: string
          results: string
          solution: string
          stats?: Json | null
        }
        Update: {
          category?: string
          challenge?: string
          client?: string
          created_at?: string
          full_description?: string | null
          headline?: string
          id?: string
          image?: string
          results?: string
          solution?: string
          stats?: Json | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          area_of_interest: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          source: string
        }
        Insert: {
          area_of_interest?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          source: string
        }
        Update: {
          area_of_interest?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          source?: string
        }
        Relationships: []
      }
      downloadable_items: {
        Row: {
          coming_soon: boolean | null
          created_at: string
          description: string
          download_url: string | null
          id: number
          is_premium: boolean | null
          size: string
          title: string
          type: string
        }
        Insert: {
          coming_soon?: boolean | null
          created_at?: string
          description: string
          download_url?: string | null
          id?: number
          is_premium?: boolean | null
          size: string
          title: string
          type: string
        }
        Update: {
          coming_soon?: boolean | null
          created_at?: string
          description?: string
          download_url?: string | null
          id?: number
          is_premium?: boolean | null
          size?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      editor_reviews: {
        Row: {
          ai_reasoning: string | null
          blog_post_id: number | null
          corrections_made: Json | null
          edited_content: string | null
          id: number
          issues_found: Json | null
          original_content: string | null
          review_type: string
          reviewed_at: string
          score: number | null
        }
        Insert: {
          ai_reasoning?: string | null
          blog_post_id?: number | null
          corrections_made?: Json | null
          edited_content?: string | null
          id?: number
          issues_found?: Json | null
          original_content?: string | null
          review_type: string
          reviewed_at?: string
          score?: number | null
        }
        Update: {
          ai_reasoning?: string | null
          blog_post_id?: number | null
          corrections_made?: Json | null
          edited_content?: string | null
          id?: number
          issues_found?: Json | null
          original_content?: string | null
          review_type?: string
          reviewed_at?: string
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "editor_reviews_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      library_items: {
        Row: {
          coming_soon: boolean | null
          created_at: string
          date: string | null
          description: string
          file_url: string | null
          id: number
          read_time: string
          title: string
          type: string
        }
        Insert: {
          coming_soon?: boolean | null
          created_at?: string
          date?: string | null
          description: string
          file_url?: string | null
          id?: number
          read_time: string
          title: string
          type: string
        }
        Update: {
          coming_soon?: boolean | null
          created_at?: string
          date?: string | null
          description?: string
          file_url?: string | null
          id?: number
          read_time?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      topic_recommendations: {
        Row: {
          category: string
          created_at: string
          id: number
          keywords: string[] | null
          reasoning: string | null
          similar_to_post_id: number | null
          status: string | null
          topic_title: string
          trending_score: number | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          keywords?: string[] | null
          reasoning?: string | null
          similar_to_post_id?: number | null
          status?: string | null
          topic_title: string
          trending_score?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          keywords?: string[] | null
          reasoning?: string | null
          similar_to_post_id?: number | null
          status?: string | null
          topic_title?: string
          trending_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_recommendations_similar_to_post_id_fkey"
            columns: ["similar_to_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
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
