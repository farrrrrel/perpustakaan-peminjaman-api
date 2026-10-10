import { supabase } from '../config/supabase.js';

export async function getAllpeminjaman(status) {
  let query = supabase
    .from('peminjaman')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  return await query;
}

export async function getpeminjamanById(id) {
  return await supabase
    .from('peminjaman')
    .select('*')
    .eq('id', id)
    .maybeSingle();
}

export async function createpeminjaman(peminjamanData) {
  return await supabase
    .from('peminjaman')
    .insert(peminjamanData)
    .select()
    .single();
}

export async function updatepeminjaman(id, peminjamanData) {
  return await supabase
    .from('peminjaman')
    .update(peminjamanData)
    .eq('id', id)
    .select()
    .single();
}

export async function deletepeminjaman(id) {
  return await supabase
    .from('peminjaman')
    .delete()
    .eq('id', id)
    .select()
    .single();
}