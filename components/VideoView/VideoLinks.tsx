import React, { useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import MyText from "@components/MyText";
import MyButton from "@components/MyButton";

interface VideoLinkInputProps {
  links: string[];
  onChange: (links: string[]) => void;
}

const VideoLinkInput: React.FC<VideoLinkInputProps> = ({ links, onChange }) => {
  const maxLinks = 3;

  useEffect(() => {
    if (links.length === 0) {
      onChange([""]);
    }
  }, [links]);

  const handleAddLink = (): void => {
    if (links.length < maxLinks) {
      onChange([...links, ""]);
    }
  };

  const handleRemoveLink = (index: number): void => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
  };

  const handleLinkChange = (value: string, index: number): void => {
    const newLinks = [...links];
    newLinks[index] = value;
    onChange(newLinks);
  };

  const renderField = (link: string, index: number) => {
    const isLastField = index === links.length - 1;
    const showAddIcon = isLastField && links.length < maxLinks;
    const showTrashIcon = links.length > 1;

    return (
      <View key={index}>
        <View style={styles.inputView}>
          <Feather name="link" size={18} color="#FF8C00" />
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter video link"
              value={link}
              onChangeText={(value) => handleLinkChange(value, index)}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />

            {showAddIcon ? (
              <TouchableOpacity
                onPress={handleAddLink}
                style={styles.iconButton}
              >
                <Feather name="plus-circle" size={20} color="#3B82F6" />
              </TouchableOpacity>
            ) : showTrashIcon ? (
              <TouchableOpacity
                onPress={() => handleRemoveLink(index)}
                style={styles.iconButton}
              >
                <Feather name="trash-2" size={20} color="#EF4444" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {links.map((link, index) => renderField(link, index))}
      <MyText style={styles.helperText}>
        Max {maxLinks} video links allowed
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    marginStart:6,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    padding: 11,
    fontSize: 16,
    width:265,
    color: "#1F2937",
  },
  iconButton: {
    padding: 12,
  },
  helperText: {
    fontSize: 14,
    color: "#6B7280",
    marginStart: 16,
  },
});

export default VideoLinkInput;
