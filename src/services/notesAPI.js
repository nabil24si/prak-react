import axios from 'axios'

const API_URL = "https://jmlqwvdnjacpkwyqtjxq.supabase.co/rest/v1/note"
const API_KEY = "sb_publishable_Tfuly0I6N1kzIfphm-9Rkg_xz9YwudH"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    // Fungsi untuk mengambil semua data catatan
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    // Fungsi untuk membuat catatan baru
    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // Fungsi baru untuk menghapus catatan berdasarkan ID (Langkah 7)
    async deleteNote(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}