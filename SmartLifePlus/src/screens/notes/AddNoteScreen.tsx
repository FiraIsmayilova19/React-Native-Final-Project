import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { getNotes, saveNotes } from '../../storage/notes';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddNoteScreen() {
    const nav = useNavigation<any>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const scheduleNotification = (noteId: string, date: Date) => {
        const delay = date.getTime() - Date.now();
        if (delay <= 0) return;

        const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'PM' : 'AM'}`;

        setTimeout(async () => {
            await fetch('https://app.nativenotify.com/api/notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appId: 31764,
                    appToken: '0pKrUZOMsula8E8YvRsFoQ',
                    title: 'Qeyd üçün xatırlatma',
                    body: title,
                    dateSent: formattedDate,
                }),
            });
        }, delay);
    };

    const save = async () => {
        if (!title.trim()) return;
        const list = await getNotes();
        const id = Date.now().toString();

        const newNote = {
            id,
            title,
            content,
            dueDate: dueDate ? dueDate.getTime() : null
        };

        list.unshift(newNote);
        await saveNotes(list);

        if (dueDate) scheduleNotification(id, dueDate);
        console.log(dueDate)
        nav.goBack();
    };



    return (
        <LinearGradient colors={['#df41caff', '#2a5298']} style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.header}>Yeni Qeyd</Text>

                <View style={styles.inputCard}>
                    <Ionicons name="pencil-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
                    <TextInput
                        placeholder="Başlıq"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputCard}>
                    <Ionicons name="document-text-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
                    <TextInput
                        placeholder="Məzmun"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={content}
                        onChangeText={setContent}
                        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
                        multiline
                    />
                </View>

                <Pressable onPress={() => setShowPicker(true)} style={styles.dateBtn}>
                    <Text style={{ color: '#fff' }}>
                        {dueDate ? dueDate.toLocaleString() : 'Son tarix seç'}
                    </Text>
                </Pressable>
                {showPicker && (
                    <DateTimePicker
                        value={dueDate || new Date()}
                        mode="datetime"
                        display="default"
                        onChange={(e, d) => {
                            setShowPicker(false);
                            if (d) setDueDate(d);
                        }}
                    />
                )}

                <Pressable onPress={save} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]}>
                    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.btnGradient}>
                        <Text style={styles.btnTxt}>Yadda saxla</Text>
                    </LinearGradient>
                </Pressable>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { color: '#fff', fontSize: 26, fontWeight: '700', marginBottom: 20 },
    inputCard: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.4)',
        paddingVertical: 6,
    },
    dateBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 14,
        borderRadius: 18,
        marginBottom: 16,
        alignItems: 'center',
    },
    btn: { borderRadius: 18, overflow: 'hidden', marginTop: 10 },
    btnGradient: { paddingVertical: 14, justifyContent: 'center', alignItems: 'center' },
    btnTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
