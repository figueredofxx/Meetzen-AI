import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do projeto Supabase
// Em produção, use variáveis de ambiente process.env.SUPABASE_URL
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sua-chave-anonima';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);