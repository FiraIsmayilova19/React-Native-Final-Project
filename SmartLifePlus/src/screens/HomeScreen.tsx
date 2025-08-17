import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const shortcuts = [
  { title: "Tapşırıqlar", to: "Tasks", icon: <Ionicons name="list-outline" size={28} color="#fff" /> },
  { title: "Qeydlər", to: "Notes", icon: <MaterialCommunityIcons name="note-outline" size={28} color="#fff" /> },
  { title: "Hava", to: "Weather", icon: <Ionicons name="partly-sunny-outline" size={28} color="#fff" /> },
  { title: "Xəbərlər", to: "News", icon: <FontAwesome5 name="newspaper" size={28} color="#fff" /> },
];

const ShortcutCard = ({ title, to, icon }: { title: string; to: any; icon: React.ReactNode }) => {
  const nav = useNavigation<any>();
  return (
    <Pressable
      onPress={() => nav.navigate(to)}
      style={({ pressed }) => [
        styles.actionCard,
        pressed ? { transform: [{ scale: 0.97 }] } : {},
      ]}
    >
      <LinearGradient
        colors={["#cb11b2ff", "#2575fc"]}
        style={styles.iconCircle}
      >
        {icon}
      </LinearGradient>
      <Text style={styles.actionText}>{title}</Text>
    </Pressable>
  );
};

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <LinearGradient colors={["#e87bf1ff", "#2a5298"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SmartLife+</Text>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            Salam{user?.firstName ? `, ${user.firstName}` : ''}! 👋
          </Text>
          <Text style={styles.subText}>Bugün üçün planlarını idarə et</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sürətli Əmrlər</Text>
          <View style={styles.actionsRow}>
            {shortcuts.map((sc) => (
              <ShortcutCard key={sc.title} title={sc.title} to={sc.to} icon={sc.icon} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ümumi Baxış</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-done-circle" size={26} color="#2575fc" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Tapşırıq</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="document-text" size={26} color="#11998e" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Qeyd</Text>
            </View>
           
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  section: {
    marginBottom: 25,
    justifyContent:'center',
    
    alignItems:'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  actionCard: {
    alignItems: "center",
    width: "48%",
    marginBottom: 15,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 12, 
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  
    color: "#333",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
